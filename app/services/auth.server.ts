import { Authenticator } from 'remix-auth'
import { login, User } from '~/models/user'
import { sessionStorage } from '~/services/session.server'
import { SpotifyStrategy } from './spotify'

export let authenticator = new Authenticator<User>(sessionStorage)

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
    async (_, __, ___, profile) => login(profile.email)
  )
)
