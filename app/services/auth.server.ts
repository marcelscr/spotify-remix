import { Authenticator } from 'remix-auth'
import type { PrivateUser } from '~/types'
import { login } from '~/models/user'
import { sessionStorage } from '~/services/session.server'
import { SpotifyStrategy } from './spotify'

export const authenticator = new Authenticator<PrivateUser>(sessionStorage)

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
    async (accessToken, _, __, profile) => {
      return login(
        { accessToken },
        profile.id,
        profile.email,
        profile.displayName,
        profile.images?.[0]?.url
      )
    }
  )
)
