import { useState, useEffect } from 'react'
import { sample } from 'lodash'
import { useRecoilValue } from 'recoil'
import _ from 'lodash'
import { useTransition } from 'remix'

import { playlistsState } from '~/atoms/playlists'
import Loading from '~/components/Loading'
import Playlists from '~/components/Playlists'

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
    <>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-8 `}>
        <>
          <img
            className="w-44 h-44 shadow-2xl rounded-lg"
            src={_.sample(playlists)?.images[0]?.url}
            alt="playlist image"
          />
          <div>
            <h1 className="text-2xl md:text-3xl xl:text-5lx font-bold">
              Playlists
            </h1>
          </div>
        </>
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
