import type { LoaderFunction } from 'remix'
import { redirect } from 'remix'
import _ from 'lodash'

export const loader: LoaderFunction = async ({ request }) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const redirectURI = process.env.LOGIN_REDIRECT_URI
  const uri = process.env.FRONTEND_URI

  const url = new URL(request.url)
  const code = url.searchParams.get('code') || ''
  const error = url.searchParams.get('error') || ''

  if (!clientId) throw new Error('Invalid SPOTIFY_CLIENT_ID')
  if (!clientSecret) throw new Error('Invalid SPOTIFY_CLIENT_SECRET')
  if (!redirectURI) throw new Error('Missing RedirectURI')
  if (!uri) throw new Error('Missing main URI')
  if (error) throw new Error(error)

  const options = {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      redirect_uri: redirectURI,
      grant_type: 'authorization_code',
      code
    }).toString()
  }

  const [accessToken, refreshToken] = await fetchToken(options)

  return redirect(
    uri + '?access_token=' + accessToken + '&refresh_token=' + refreshToken
  )
}

const fetchToken = async (options: RequestInit): Promise<string[]> => {
  return fetch('https://accounts.spotify.com/api/token', options)
    .then(response => response.json())
    .then(data => {
      const requestError = _.get(data, 'error')
      const errorDescription = _.get(data, 'error_description')
      if (requestError) throw new Error(requestError + ': ' + errorDescription)

      const accessToken = _.get(data, 'access_token')
      const refreshToken = _.get(data, 'refresh_token')
      if (!accessToken) throw new Error('Missing accessToken')

      return [accessToken, refreshToken]
    })
}
