import { SimplifiedPlaylist } from '~/types'

type Props = {
  playlist: SimplifiedPlaylist
  order: number
}

function Playlist({ playlist, order }: Props) {
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10 rounded-sm"
          src={playlist.images[0]?.url}
          alt="playlist image"
        />
        <div>
          <p className="w-36 lg:w-96 truncate text-white">{playlist.name}</p>
          <p className="w-40 lg:w-96">{playlist.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline ">{playlist.tracks.total} songs</p>
        <p>{playlist.owner.display_name}</p>
      </div>
    </div>
  )
}

export default Playlist
