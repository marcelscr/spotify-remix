import { useRecoilState } from 'recoil'
import { useState, useEffect, useCallback } from 'react'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon
} from '@heroicons/react/solid'

import { debounce } from 'lodash'
import SpotifyClientApi from '~/lib/spotify.client'
import useSongInfo from '~/hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '~/atoms/songs'

const Player = () => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      const api = await SpotifyClientApi.get()
      await api.getMyCurrentPlayingTrack().then(data => {
        console.log('Now playing: ', data.body?.item)
        setCurrentTrackId(data.body?.item?.id)
      })
      await api
        .getMyCurrentPlaybackState()
        .then(data => setIsPlaying(data.body?.is_playing))
    }
  }

  const handlePlayPause = async () => {
    const api = await SpotifyClientApi.get()
    api.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        api.pause()
        setIsPlaying(false)
      } else {
        api.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    fetchCurrentSong()
    setVolume(50)
  }, [currentTrackIdState])

  useEffect(() => {
    debouncedAdjustVolume(volume)
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce(async volume => {
      const api = await SpotifyClientApi.get()
      api.setVolume(volume).catch(err => console.error(err))
    }, 500),
    []
  )

  console.log('Song Info', songInfo)

  const iconButtonClassname =
    'w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out'
  const largeButtonClassname =
    'w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out'

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {songInfo && (
          <>
            <img
              className="hidden md:inline h-10 w-10"
              src={songInfo?.album?.images[0]?.url}
              alt="song image"
            />
            <div>
              <h3>{songInfo?.name}</h3>
              <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
          </>
        )}
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ReplyIcon className={iconButtonClassname} />
        <RewindIcon
          className={iconButtonClassname}
          onClick={async () => {
            // Not working
            SpotifyClientApi.get().then(api => api.skipToPrevious())
          }}
        />
        {isPlaying ? (
          <PauseIcon
            className={largeButtonClassname}
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className={largeButtonClassname}
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon
          className={iconButtonClassname}
          onClick={async () => {
            // Not working
            SpotifyClientApi.get().then(api => api.skipToNext())
          }}
        />
        <SwitchHorizontalIcon className={iconButtonClassname} />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          className={iconButtonClassname}
          onClick={() => {
            volume > 0 && setVolume(Math.max(0, volume - 10))
          }}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={e => {
            setVolume(Number(e.target.value))
          }}
        />
        <VolumeUpIcon
          className={iconButtonClassname}
          onClick={() => {
            volume < 100 && setVolume(Math.min(100, volume + 10))
          }}
        />
      </div>
    </div>
  )
}

export default Player
