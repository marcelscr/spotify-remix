import { useRecoilValue } from 'recoil'
import { useTransition } from 'remix'

import { playlistsState } from '~/atoms/playlists'
import Loading from '~/components/utils/Loading'
import Playlists from '~/components/Playlists'
import PlaylistHeader from '~/components/PlaylistHeader'

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
