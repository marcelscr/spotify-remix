import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetchCurrentSong()
    setVolume(50)
  }, [currentTrackIdState])

  console.log('Song Info', songInfo)

  return (
    <div>
      {/*Left */}
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images[0]?.url}
          alt="song image"
        />
      </div>
    </div>
  )
}

export default Player
