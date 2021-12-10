import { atom } from 'recoil'
import { SimplifiedPlaylist } from '~/types'

export const playlistsState = atom<SimplifiedPlaylist[]>({
  key: 'playlistsState',
  default: []
})
