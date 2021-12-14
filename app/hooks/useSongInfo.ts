import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { currentTrackIdState, currentSongInfoState } from '~/atoms/songs'
import SpotifyClientApi from '~/lib/spotify.client'

const useSongInfo = () => {
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const [songInfo, setSongInfo] = useRecoilState(currentSongInfoState)

  useEffect(() => {
    const fetchSongInfo = () => {
      if (currentTrackId) {
        SpotifyClientApi.get()
          .then(api => api.getTrack(currentTrackId))
          .then(data => setSongInfo(data.body))
      }
    }
    fetchSongInfo()
  }, [currentTrackId])

  return songInfo
}

export default useSongInfo
