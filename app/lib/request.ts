import { AuthTokens, FullPlaylist, SimplifiedPlaylist } from '~/types'
import spotifyApi from '~/lib/spotify.server'
import SpotifyWebApi from 'spotify-web-api-node'

export async function getUserPlaylists(
  api: SpotifyWebApi
): Promise<SimplifiedPlaylist[]> {
  return await api.getUserPlaylists().then(data => data.body.items)
}

export async function getFeaturedPlaylists(
  api: SpotifyWebApi
): Promise<SimplifiedPlaylist[]> {
  return await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)
}

export async function getPlaylist(
  api: SpotifyWebApi,
  id: string
): Promise<FullPlaylist> {
  try {
    return await api.getPlaylist(id).then(data => data.body)
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }
}
