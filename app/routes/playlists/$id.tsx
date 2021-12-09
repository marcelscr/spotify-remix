import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import invariant from 'tiny-invariant'
import Center from '~/components/Center'
import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { User, FullPlaylist } from '~/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  invariant(params.id, 'expected params.id')

  const api = await spotifyApi(request, tokens)

  let playlist
  try {
    playlist = await api.getPlaylist(params.id).then(data => data.body)
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }

  return {
    user,
    playlist
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlists - Remix'
  }
}

export default function Index() {
  const data = useLoaderData<{
    user: User
    playlist: FullPlaylist
  }>()

  return <Center user={data.user} playlist={data.playlist} />
}
