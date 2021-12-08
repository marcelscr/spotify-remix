import type { MetaFunction, LoaderFunction } from 'remix'
import { Link, Form, useLoaderData } from 'remix'
import { User } from '~/models/user'
import { authenticator } from '~/services/auth.server'

import Sidebar from '~/components/Sidebar'

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request)
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

        <p>Message from the loader: {data.message}</p>
        {!data.user && (
          <p>
            <Link to="login">Link to login page.</Link> Clicking this link will
            land you in the login page UI.
          </p>
        )}
        {data.user && (
          <Form action="/logout" method="post">
            <button>Logout</button>
          </Form>
        )}
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
