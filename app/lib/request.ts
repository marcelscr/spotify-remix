import { FullPlaylist, SimplifiedPlaylist, SingleTrack } from '~/types'
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

export async function getTrack(
  api: SpotifyWebApi,
  id: string
): Promise<SingleTrack> {
  try {
    return await api.getTrack(id).then(data => data.body)
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }
}
