import { useState, useEffect } from 'react'
import { sample } from 'lodash'
import { useRecoilValue } from 'recoil'
import _ from 'lodash'
import { Link, useTransition } from 'remix'

import { playlistsState } from '~/atoms/playlists'
import Loading from '~/components/Loading'

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
  const [color, setColor] = useState('')
  const transition = useTransition()
  const loading = transition.state === 'loading'

  useEffect(() => {
    setColor(sample(colors) ?? colors[0])
  }, [playlists])

  return (
    <div className="flex-grow">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-8 `}>
        <>
          <img
            className="w-44 h-44 shadow-2xl"
            src={playlists[0]?.images[0]?.url}
            alt="playlist image"
          />
          <div>
            <h1 className="text-2xl md:text-3xl xl:text-5lx font-bold">
              SELECT A PLAYLIST
            </h1>
          </div>
        </>
      </section>
      <section>
        <div className="text-gray-500 p-8 space-y-4">
          {loading ? (
            <Loading />
          ) : (
            _.map(playlists, playlist => {
              return (
                <p key={playlist.id}>
                  <Link
                    to={`/playlists/${playlist.id}`}
                    className="cursor-pointer hover:text-white">
                    {playlist.name}
                  </Link>
                </p>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}

export default Playlist
