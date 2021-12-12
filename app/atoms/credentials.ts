import { atom } from 'recoil'
import type { AuthTokens } from '~/types'

export const spotifyCredentialsState = atom<AuthTokens | null>({
  key: 'spotifyCredentialsState',
  default: null
})
