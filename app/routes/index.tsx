import type { MetaFunction, LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import Sidebar from '~/components/Sidebar'

type IndexData = { keys: string }

export const loader: LoaderFunction = () => {
  return json({ keys: process.env.SPOTIFY_CLIENT_ID })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  const data = useLoaderData<IndexData>()

  console.log(data)
  return (
    <div className="bg-black h-screen">
      <main>
        <Sidebar />

        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
