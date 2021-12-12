import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { SingleTrack } from '~/types'
import { currentTrackIdState, isPlayingState } from '~/atoms/songs'
import SpotifyClientApi from '~/lib/spotify.client'
import { getTrack } from '~/lib/request'

const useSongInfo = () => {
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const isPlaying = useRecoilValue(isPlayingState)
  const [songInfo, setSongInfo] = useState<SingleTrack | null>(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const api = await SpotifyClientApi.get()
        const trackInfo = await getTrack(api, currentTrackId)
        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [currentTrackId])

  return songInfo
}

export default useSongInfo
