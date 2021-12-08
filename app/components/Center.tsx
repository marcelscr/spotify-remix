import { useState, useEffect } from 'react'
import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { User } from '~/models/user'
import { authenticator } from '~/services/auth.server'
import { sample } from 'lodash'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return { user }
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

export function Center() {
  const data = useLoaderData<{ user: User }>()
  const [color, setColor] = useState('')

  useEffect(() => {
    setColor(sample(colors) ?? colors[0])
  }, [])

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 p-r-2">
          <img
            className="rounded-full w-10 h-10"
            src={data.user.image}
            alt="user image"
          />
          <h2>{data.user.name ?? data.user.id}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <h1>Hello</h1>
      </section>
    </div>
  )
}

export default Center
