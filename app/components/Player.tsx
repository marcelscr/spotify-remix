import { useRecoilState } from 'recoil'
import { useState } from 'react'

import useSongInfo from '~/hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '~/atoms/songs'

const Player = () => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  console.log({ songInfo })
  return (
    <div>
      {/*Left */}
      {/* <div>
        <img src={songInfo?.album?.images[0]?.url} alt="song image" />
      </div> */}
      <h1>Player</h1>
    </div>
  )
}

export default Player
