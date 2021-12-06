import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, json, Link } from 'remix'

type IndexData = {}

export const loader: LoaderFunction = () => {
  return json({})
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  const data = useLoaderData<IndexData>()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main>
        <h1>This is a DOPE spotify build.</h1>
      </main>
    </div>
  )
}
