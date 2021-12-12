import SpotifyWebApi from 'spotify-web-api-node'
import { AuthTokens } from '~/types'

class SpotifyClientApi {
  private client?: SpotifyWebApi
  private expiresAt?: number

  constructor() {
    this.expiresAt = 0
  }

  public init(clientId: string, clientSecret: string, tokens: AuthTokens) {
    if (this.client) return

    this.client = new SpotifyWebApi({
      clientId,
      clientSecret,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    })
    this.expiresAt = tokens.expiresAt
  }

  hasValidAccessToken() {
    if (!this.client) false
    return this.expiresAt && Date.now() < this.expiresAt
  }

  private async refreshAccessToken() {
    if (!this.client) throw new Error('The Spotify API is not initialized.')

    try {
      const response = await this.client.refreshAccessToken()

      const accessToken = response.body.access_token
      const refreshToken = response.body.refresh_token
      const expiresAt = Date.now() + response.body.expires_in * 1000

      // Update the API
      this.client.setAccessToken(accessToken)
      this.client.setRefreshToken(refreshToken ?? '')
      this.expiresAt = expiresAt
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async get() {
    if (!this.client) throw new Error('The Spotify API is not initialized.')

    if (!this.hasValidAccessToken()) {
      await this.refreshAccessToken()
    }

    return this.client
  }
}

const spotifyClientApi = new SpotifyClientApi()

export default spotifyClientApi
