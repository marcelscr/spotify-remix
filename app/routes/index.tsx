import type { MetaFunction, LoaderFunction } from 'remix'
import { Link, Form, useLoaderData } from 'remix'
import { User } from '~/models/user'
import { authenticator } from '~/services/auth.server'

import Sidebar from '~/components/Sidebar'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return { message: 'this is awesome 😎', user }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}

export default function Index() {
  const data = useLoaderData<{ user: User; message: string }>()

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
