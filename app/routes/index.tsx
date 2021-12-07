import type { MetaFunction } from 'remix'

import Sidebar from '~/components/Sidebar'

// type IndexData = {}

// export const loader: LoaderFunction = () => {
//   return json({})
// }

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  //const data = useLoaderData<IndexData>()

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
