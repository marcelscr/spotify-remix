import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'

import Sidebar from '~/components/Sidebar'
import Center from '~/components/Center'
import useSpotify from '~/hooks/useSpotify'
import { authenticator } from '~/services/auth.server'
import type { User, Playlist } from '~/types'
import { toPublicUser } from '~/models/user'

export const loader: LoaderFunction = async ({ request }) => {
  const privateUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const spotifyApi = useSpotify(privateUser)
  const playlists = await spotifyApi
    .getUserPlaylists()
    .then(data => data.body.items)

  return { user: toPublicUser(privateUser), playlists: playlists ?? [] }
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
