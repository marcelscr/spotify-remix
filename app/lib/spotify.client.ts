import SpotifyWebApi from 'spotify-web-api-node'
import { AuthTokens } from '~/types'
import { encode } from 'base-64'

// I'm not happy with this class. There must be an easier way to use the API on the client side
class SpotifyClientApi {
  private client: SpotifyWebApi
  private expiresAt: number

  constructor() {
    this.client = new SpotifyWebApi()
    this.expiresAt = 0
  }

  init(clientId: string, clientSecret: string, tokens: AuthTokens) {
    this.client.setCredentials({
      clientId,
      clientSecret,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
    this.expiresAt = tokens.expiresAt
  }

  async refreshAccessToken() {
    // Making the request manually since the Spotify Api is not working
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          encode(
            this.client.getClientId() + ':' + this.client.getClientSecret()
          )
      },
      body: new URLSearchParams({
        refresh_token: this.client.getRefreshToken() ?? '',
        grant_type: 'refresh_token'
      })
    }

    console.log('Refreshing the token')
    await fetch('https://accounts.spotify.com/api/token', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.client.setAccessToken(data['access_token'])
        this.expiresAt = Date.now() + data['expires_in'] * 1000
      })
  }

  async get() {
    if (!this.client.getAccessToken()) {
      await this.client.getAccessToken()
    }

    if (Date.now() < this.expiresAt) {
      await this.refreshAccessToken()
    }

    return this.client
  }
}

const spotifyClientApi = new SpotifyClientApi()

export default spotifyClientApi
