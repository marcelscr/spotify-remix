import { useRecoilValue } from 'recoil'
import { useTransition } from 'remix'

import { playlistsState } from '~/atoms/playlists'
import Loading from '~/components/Loading'
import Playlists from '~/components/Playlists'
import PlaylistHeader from '~/components/PlaylistHeader'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

function Playlist() {
  const playlists = useRecoilValue(playlistsState)
  const transition = useTransition()
  const loading = transition.state === 'loading'

  return (
    <>
      <section>
        <PlaylistHeader
          title="Playlists"
          imageUrl={playlists[0]?.images[0]?.url}
        />
      </section>
      <section>
        {loading ? (
          <div className="flex justify-center mt-36">
            <Loading />
          </div>
        ) : (
          <Playlists playlists={playlists} />
        )}
      </section>
    </>
  )
}

export default Playlist
