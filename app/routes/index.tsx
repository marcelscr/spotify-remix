import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'

import Sidebar from '~/components/Sidebar'
import Center from '~/components/Center'
import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { User, SimplifiedPlaylist, FullPlaylist } from '~/types'
import { getStringParam, SearchParams } from '~/lib/search-params'

export const loader: LoaderFunction = async ({ request }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  const url = new URL(request.url)
  const playlistIdParam = getStringParam(url, SearchParams.PLAYLIST_ID)

  const api = await spotifyApi(request, tokens)
  const userPlaylists = await api
    .getUserPlaylists()
    .then(data => data.body.items)
  const featuredPlaylists = await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)

  const playlists = [...userPlaylists, ...featuredPlaylists]

  const playlistId = playlistIdParam ?? playlists[0]?.id

  let playlist
  try {
    playlist = playlistId
      ? await api.getPlaylist(playlistId).then(data => data.body)
      : null
  } catch (error) {
    console.error(error)
  }

  return {
    user,
    playlists,
    playlist
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  const data = useLoaderData<{
    user: User
    playlists: SimplifiedPlaylist[]
    playlist: FullPlaylist
  }>()

  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <Sidebar playlists={data.playlists} />
        <Center user={data.user} playlist={data.playlist} />
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
