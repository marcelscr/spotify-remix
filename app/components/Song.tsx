import { millisToMinutesAndSeconds } from '~/lib/time'
import { PlaylistTrack } from '~/types'

type Props = {
  track: PlaylistTrack
  order: number
}

function Song({ track, order }: Props) {
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.track.album.images[0].url}
          alt="song album image"
        />
        <div>
          <p className="w-36 lg:w-96 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline ">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song