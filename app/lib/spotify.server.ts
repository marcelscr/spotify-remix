import SpotifyWebApi from 'spotify-web-api-node'
import { commitSession, getSession } from '~/services/session.server'
import { AuthTokens } from '~/types'
import { Session } from 'remix'

async function refreshAccessToken(api: SpotifyWebApi, session: Session) {
  try {
    const response = await api.refreshAccessToken()

    const accessToken = response.body.access_token
    const refreshToken = response.body.refresh_token
    const expiresAt = Date.now() + (response.body.expires_in - 120) * 1000 // Refresh two minutes earlier

    // Update the API
    api.setAccessToken(accessToken)
    api.setRefreshToken(refreshToken ?? '')

    // Update the Session
    session.set('accessToken', accessToken)
    session.set('refreshToken', refreshToken)
    session.set('expiresAt', expiresAt)
    await commitSession(session)
  } catch (error) {
    console.error(error)
    throw error
  }
}

function hasValidAccessToken(session: Session) {
  return (
    session.get('accessToken') &&
    session.get('refreshToken') &&
    session.get('expiresAt') &&
    Date.now() < session.get('expiresAt')
  )
}

async function spotifyApi(request: Request, tokens: AuthTokens) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  })
  const session = await getSession(request)

  if (!hasValidAccessToken(session)) {
    await refreshAccessToken(spotifyApi, session)
  }

  return spotifyApi
}

export default spotifyApi
