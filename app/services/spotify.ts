import {
  AuthorizationError,
  OAuth2Profile,
  OAuth2Strategy,
  OAuth2StrategyVerifyCallback
} from 'remix-auth'

export interface SpotifyImage {
  url: string
}

export interface SpotifyProfile extends OAuth2Profile {
  id: string
  display_name: string
  email: string
  images: SpotifyImage[]
}

export interface SpotifyStrategyOptions {
  clientID: string
  clientSecret: string
  callbackURL: string
  scope?: string
}

export interface SpotifyExtraParams extends Record<string, string | number> {
  tokenType: string
}

export class SpotifyStrategy<User> extends OAuth2Strategy<
  User,
  SpotifyProfile,
  SpotifyExtraParams
> {
  name = 'spotify'

  private scope: string
  private userInfoURL = 'https://api.spotify.com/v1/me'

  constructor(
    { clientID, clientSecret, callbackURL, scope }: SpotifyStrategyOptions,
    verify: OAuth2StrategyVerifyCallback<
      User,
      SpotifyProfile,
      SpotifyExtraParams
    >
  ) {
    super(
      {
        clientID,
        clientSecret,
        callbackURL,
        authorizationURL: 'https://accounts.spotify.com/authorize',
        tokenURL: 'https://accounts.spotify.com/api/token'
      },
      verify
    )
    this.scope = scope ?? 'user-read-private user-read-email'
  }

  protected authorizationParams() {
    return new URLSearchParams({
      scope: this.scope
    })
  }

  protected async userProfile(accessToken: string): Promise<SpotifyProfile> {
    let response = await fetch(this.userInfoURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    let data: SpotifyProfile = await response.json()

    let profile: SpotifyProfile = {
      provider: 'spotify',
      id: data.id,
      display_name: data.display_name,
      email: data.email,
      images: data.images
    }

    return profile
  }

  protected async getAccessToken(response: Response): Promise<{
    accessToken: string
    refreshToken: string
    extraParams: SpotifyExtraParams
  }> {
    let data = await response.json()

    let accessToken = new URLSearchParams(data).get('access_token')
    if (!accessToken) throw new AuthorizationError('Missing access token.')

    let tokenType = new URLSearchParams(data).get('token_type')
    if (!tokenType) throw new AuthorizationError('Missing token type.')

    let refreshToken = new URLSearchParams(data).get('refresh_token')
    if (!refreshToken) throw new AuthorizationError('Missing refresh type.')

    return {
      accessToken,
      refreshToken,
      extraParams: { tokenType }
    } as const
  }
}
