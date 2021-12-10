import { SimplifiedPlaylist } from '~/types'
import Playlist from './Playlist'
import { Link } from 'remix'

type Props = {
  playlists?: SimplifiedPlaylist[]
}

function Playlists({ playlists }: Props) {
  if (!playlists) return null

  return (
    <div className="px-8 flex flex-col  space-y-1 pb-28">
      {playlists.map((playlist, i) => {
        return (
          <Link
            to={`/playlists/${playlist.id}`}
            className="cursor-pointer hover:text-white"
            key={playlist.id}>
            <Playlist playlist={playlist} order={i} />
          </Link>
        )
      })}
    </div>
  )
}

export default Playlists
