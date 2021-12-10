import { Authenticator } from 'remix-auth'
import type { AuthResponse } from '~/types'
import { sessionStorage } from '~/services/session.server'
import { SpotifyStrategy } from './spotify'

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

authenticator.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
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
