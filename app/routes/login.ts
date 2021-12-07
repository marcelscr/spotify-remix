import type { LoaderFunction } from 'remix'
import { redirect } from 'remix'
import { createSearchParams } from 'react-router-dom'

export const loader: LoaderFunction = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const redirectURI =
    process.env.LOGIN_REDIRECT_URI || 'http://localhost:3000/callback'

  if (!clientId) {
    throw new Error('Invalid SPOTIFY_CLIENT_ID')
  }

  const params = createSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'user-read-private user-read-email',
    redirect_uri: redirectURI
  })

  return redirect('https://accounts.spotify.com/authorize?' + params.toString())
}
