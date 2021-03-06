// User
export interface User {
  id: string
  email: string
  name?: string
  image?: string
}

// Error
export interface Error {
  message: string
  status?: number
  reason?: string
}

// Auth
export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresAt: number
  tokenType?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

// Playlist
export type SimplifiedPlaylist = SpotifyApi.PlaylistObjectSimplified
export type FullPlaylist = SpotifyApi.PlaylistObjectFull
export type PlaylistTrack = SpotifyApi.PlaylistTrackObject
export type SingleTrack = SpotifyApi.SingleTrackResponse
