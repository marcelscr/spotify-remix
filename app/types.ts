// User
export interface User {
  id: string
  email: string
  name?: string
  image?: string
}

export interface PrivateUser extends User {
  credentials: {
    accessToken: string
  }
}

// Playlist
export type Playlist = SpotifyApi.PlaylistObjectSimplified
