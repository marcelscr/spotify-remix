import { FullPlaylist, PlaylistTrack } from '~/types'
import Song from './Song'

type Props = {
  playlist?: FullPlaylist
  onClick: (track: PlaylistTrack) => void
}

function Songs({ playlist, onClick }: Props) {
  if (!playlist) return null

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28">
      {playlist.tracks.items
        .filter(track => track.track)
        .map((track, i) => {
          return (
            <Song
              key={track.track.id}
              track={track}
              order={i}
              onClick={onClick}
            />
          )
        })}
    </div>
  )
}

export default Songs
