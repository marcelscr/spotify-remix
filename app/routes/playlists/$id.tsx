import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, useTransition } from 'remix'
import invariant from 'tiny-invariant'

import { getPlaylist } from '~/lib/request'
import { authenticator } from '~/services/auth.server'
import type { User, FullPlaylist } from '~/types'
import Loading from '~/components/Loading'
import Songs from '~/components/Songs'
import PlaylistHeader from '~/components/PlaylistHeader'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  invariant(params.id, 'expected params.id')

  const playlist = await getPlaylist(request, tokens, params.id)

  return {
    user,
    playlist
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlist - Remix'
  }
}

function Playlist() {
  const data = useLoaderData<{
    user: User
    playlist?: FullPlaylist
  }>()
  const transition = useTransition()
  const loading = transition.state === 'loading'

  return (
    <>
      <section>
        <PlaylistHeader
          title={data.playlist?.name}
          subtitle="PLAYLIST"
          imageUrl={data.playlist?.images[0]?.url}
        />
      </section>
      <section>
        {loading ? (
          <div className="flex justify-center mt-36">
            <Loading />
          </div>
        ) : (
          <Songs playlist={data.playlist} />
        )}
      </section>
    </>
  )
}

export default Playlist
