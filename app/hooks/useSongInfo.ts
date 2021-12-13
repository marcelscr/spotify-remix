import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  currentTrackIdState,
  isPlayingState,
  currentSongInfoState
} from '~/atoms/songs'
import SpotifyClientApi from '~/lib/spotify.client'

const useSongInfo = () => {
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const isPlaying = useRecoilValue(isPlayingState)
  const [songInfo, setSongInfo] = useRecoilState(currentSongInfoState)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const api = await SpotifyClientApi.get()
        const trackInfo = await api
          .getTrack(currentTrackId)
          .then(data => data.body)

        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [currentTrackId])

  return songInfo
}

export default useSongInfo
