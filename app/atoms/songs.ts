import { atom } from 'recoil'
import { SingleTrack } from '~/types'

export const currentTrackIdState = atom<string | undefined>({
  key: 'currentTrackIdState',
  default: undefined
})

export const isPlayingState = atom<boolean>({
  key: 'isPlayingState',
  default: false
})

export const currentSongInfoState = atom<SingleTrack | undefined>({
  key: 'currentSongInfoState',
  default: undefined
})
