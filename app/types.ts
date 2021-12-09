// User
export interface User {
  id: string
  email: string
  name?: string
  image?: string
}

// Auth
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn?: number
  tokenType: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

// Playlist
export type Playlist = SpotifyApi.PlaylistObjectSimplified
