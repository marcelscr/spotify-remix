import SpotifyWebApi from 'spotify-web-api-node'
import { commitSession, getSession } from '~/services/session.server'
import { AuthTokens } from '~/types'

async function spotifyApi(request: Request, tokens: AuthTokens) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })
  spotifyApi.setAccessToken(tokens.accessToken)
  spotifyApi.setRefreshToken(tokens.refreshToken)

  async function refreshAccessToken() {
    try {
      const response = await spotifyApi.refreshAccessToken()
      return {
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token,
        expiresAt: Date.now() + (response.body.expires_in - 120) * 1000 // Refresh two minutes earlier
      }
    } catch (error) {
      console.error(error)
      return {
        error: 'RefreshAccessTokenError'
      }
    }
  }

  const session = await getSession(request)

  const hasValidAccessToken =
    session.get('accessToken') &&
    session.get('refreshToken') &&
    session.get('expiresAt') &&
    Date.now() >= session.get('expiresAt')

  console.log({ now: Date.now(), expires: session.get('expiresAt') })

  if (!hasValidAccessToken) {
    const { accessToken, refreshToken, expiresAt, error } =
      await refreshAccessToken()

    if (error) throw new Error(error)

    session.set('accessToken', accessToken)
    session.set('refreshToken', refreshToken)
    session.set('expiresAt', expiresAt)

    await commitSession(session)
  }

  spotifyApi.setAccessToken(session.get('accessToken'))
  spotifyApi.setRefreshToken(session.get('refreshToken'))

  return spotifyApi
}

export default spotifyApi
