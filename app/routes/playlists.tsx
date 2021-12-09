import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Outlet } from 'remix'

import Sidebar from '~/components/Sidebar'
import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { SimplifiedPlaylist } from '~/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const api = await spotifyApi(request, tokens)
  const userPlaylists = await api
    .getUserPlaylists()
    .then(data => data.body.items)
  const featuredPlaylists = await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)

  const playlists = [...userPlaylists, ...featuredPlaylists]

  return {
    playlists
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlists - Remix'
  }
}

export default function Index() {
  const data = useLoaderData<{
    playlists: SimplifiedPlaylist[]
  }>()

  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <Sidebar playlists={data.playlists} />
        <Outlet />
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
