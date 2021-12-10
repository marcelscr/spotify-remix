import { FullPlaylist } from '~/types'
import Song from './Song'

type Props = {
  playlist?: FullPlaylist
}

function Songs({ playlist }: Props) {
  if (!playlist) return null

  return (
    <div className="px-8 flex flex-col space-y-1 text-white pb-28">
      {playlist.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
