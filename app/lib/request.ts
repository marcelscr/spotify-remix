import { AuthTokens, FullPlaylist, SimplifiedPlaylist } from '~/types'
import spotifyApi from '~/lib/spotify'

export async function getUserPlaylists(
  request: Request,
  tokens: AuthTokens
): Promise<SimplifiedPlaylist[]> {
  const api = await spotifyApi(request, tokens)
  return await api.getUserPlaylists().then(data => data.body.items)
}

export async function getFeaturedPlaylists(
  request: Request,
  tokens: AuthTokens
): Promise<SimplifiedPlaylist[]> {
  const api = await spotifyApi(request, tokens)
  return await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)
}

export async function getPlaylist(
  request: Request,
  tokens: AuthTokens,
  id: string
): Promise<FullPlaylist> {
  const api = await spotifyApi(request, tokens)
  try {
    return await api.getPlaylist(id).then(data => data.body)
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }
}
