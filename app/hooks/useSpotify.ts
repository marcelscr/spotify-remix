import SpotifyWebApi from 'spotify-web-api-node'
import type { PrivateUser } from '~/types'

function useSpotify(user: PrivateUser) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  spotifyApi.setAccessToken(user.credentials.accessToken)

  return spotifyApi
}

export default useSpotify
