import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { sample } from 'lodash'

import type { User, FullPlaylist } from '~/types'
import { useTransition } from 'remix'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

type Props = {
  user: User
  playlist?: FullPlaylist
}

export function Center({ user, playlist }: Props) {
  const [color, setColor] = useState('')
  const transition = useTransition()
  const loading = transition.state === 'loading'

  useEffect(() => {
    setColor(sample(colors) ?? colors[0])
  }, [playlist])

  const loadingComponent = <h1>Loading...</h1>
  const playlistNotFoundComponent = <h1>Playlist not found</h1>
  const playlistComponent = <h1>{playlist?.name}</h1>

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 p-r-2">
          <img
            className="rounded-full w-10 h-10"
            src={user.image}
            alt="user image"
          />
          <h2>{user.name ?? user.id}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-8 `}>
        {loading
          ? loadingComponent
          : playlist
          ? playlistComponent
          : playlistNotFoundComponent}
      </section>
    </div>
  )
}

export default Center
