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

  const response = await (
    await fetch('https://accounts.spotify.com/api/token', options)
  ).json()

  console.log(JSON.stringify(response))

  const requestError = _.get(response, 'error')
  const errorDescription = _.get(response, 'error_description')
  if (requestError) throw new Error(requestError + ': ' + errorDescription)

  const accessToken = _.get(response, 'access_token')
  const refreshToken = _.get(response, 'refresh_token')

  if (!accessToken) throw new Error('Missing accessToken')

  return redirect(
    uri + '?access_token=' + accessToken + '&refresh_token=' + refreshToken
  )
}
