import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, useTransition } from 'remix'
import invariant from 'tiny-invariant'
import { useRecoilState } from 'recoil'

import { getPlaylist } from '~/lib/request'
import { authenticator } from '~/services/auth.server'
import type { User, FullPlaylist, PlaylistTrack } from '~/types'
import Loading from '~/components/Loading'
import Songs from '~/components/Songs'
import PlaylistHeader from '~/components/PlaylistHeader'

import { currentTrackIdState, isPlayingState } from '~/atoms/songs'
import spotifyApi from '~/lib/spotify'

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

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  console.log(currentTrackId)
  console.log(isPlaying)

  const onSongClick = (track: PlaylistTrack) => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
  }

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
          <Songs playlist={data.playlist} onClick={onSongClick} />
        )}
      </section>
    </>
  )
}

export default Playlist
