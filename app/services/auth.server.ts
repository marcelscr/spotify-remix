import { Authenticator } from 'remix-auth'
import type { AuthResponse } from '~/types'
import { sessionStorage } from '~/services/session.server'
import { SpotifyStrategy } from './spotifyStrategy'

export const authenticator = new Authenticator<AuthResponse>(sessionStorage)

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error('Missing SPOTIFY_CLIENT_ID env')
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET env')
}

if (!process.env.CALLBACK_URL) {
  throw new Error('Missing CALLBACK_URL env')
}

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'streaming'
].join(' ')

console.log(scopes)

authenticator.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: scopes
    },
    async (accessToken, refreshToken, { expiresIn, tokenType }, profile) => {
      return {
        user: {
          id: profile.id,
          email: profile.email,
          name: profile.display_name,
          image: profile.images?.[0]?.url
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn,
          tokenType
        }
      }
    }
  )
)
