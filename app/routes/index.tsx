import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'

import Sidebar from '~/components/Sidebar'
import Center from '~/components/Center'
import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { User, Playlist } from '~/types'

export const loader: LoaderFunction = async ({ request }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const api = await spotifyApi(request, tokens)
  const playlists = await api.getUserPlaylists().then(data => data.body.items)
  const featuredPlaylists = await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)

  return {
    user,
    playlists: [...playlists, ...featuredPlaylists] ?? []
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  const data = useLoaderData<{ user: User; playlists: Playlist[] }>()

  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <Sidebar playlists={data.playlists} />
        <Center user={data.user} />
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
