import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, useTransition } from 'remix'
import invariant from 'tiny-invariant'
import { useState, useEffect } from 'react'
import { sample } from 'lodash'

import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { User, FullPlaylist } from '~/types'
import Loading from '~/components/Loading'
import Songs from '~/components/Songs'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  invariant(params.id, 'expected params.id')

  const api = await spotifyApi(request, tokens)

  let playlist
  try {
    playlist = await api.getPlaylist(params.id).then(data => data.body)
  } catch (error) {
    console.error(error)
    throw new Response('Not Found', { status: 404 })
  }

  return {
    user,
    playlist
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlist - Remix'
  }
}

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
  const data = useLoaderData<{
    user: User
    playlist?: FullPlaylist
  }>()
  const [color, setColor] = useState('')
  const transition = useTransition()
  const loading = transition.state === 'loading'

  useEffect(() => {
    setColor(sample(colors) ?? colors[0])
  }, [data.playlist])

  return (
    <>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-8 `}>
        <img
          className="w-44 h-44 shadow-2xl"
          src={data.playlist?.images[0]?.url}
          alt="playlist image"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5lx font-bold">
            {data.playlist?.name}
          </h1>
        </div>
      </section>
      {loading ? (
        <div className="flex justify-center mt-36">
          <Loading />
        </div>
      ) : (
        data.playlist && (
          <section className="text-white p-8">
            <Songs playlist={data.playlist} />
          </section>
        )
      )}
    </>
  )
}

export default Playlist
