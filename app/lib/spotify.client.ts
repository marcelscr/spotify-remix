import SpotifyWebApi from 'spotify-web-api-node'
import { AuthTokens } from '~/types'

class SpotifyClientApi {
  private client: SpotifyWebApi

  constructor() {
    this.client = new SpotifyWebApi()
  }

  init(clientId: string, clientSecret: string, tokens: AuthTokens) {
    this.client.setCredentials({
      clientId,
      clientSecret,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
  }

  async refreshAccessToken() {
    try {
      console.log('Refreshing the token')
      const response = await this.client.refreshAccessToken()

      // Update the API
      this.client.setAccessToken(response.body.access_token)
      this.client.setRefreshToken(response.body.refresh_token ?? '')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async get() {
    if (!this.client.getAccessToken()) {
      await this.client.getAccessToken()
    }

    console.log('Getting the client', this.client)
    return this.client
  }
}

const spotifyClientApi = new SpotifyClientApi()

export default spotifyClientApi
