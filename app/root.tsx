import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation
} from 'remix'
import type { LinksFunction, LoaderFunction } from 'remix'
import { RecoilRoot, useRecoilState } from 'recoil'
import { useEffect } from 'react'

import ToastContainer from '~/components/utils/ToastContainer'
import { authenticator } from '~/services/auth.server'
import type { AuthTokens, User } from '~/types'
import { userState } from '~/atoms/user'
import SpotifyClientApi from '~/lib/spotify.client'

import { getEnv } from './utils/env.server'
import tailwindUrl from './styles/tailwind.css'
import toastifyUrl from 'react-toastify/dist/ReactToastify.min.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindUrl },
    { rel: 'stylesheet', href: toastifyUrl }
  ]
}

export type LoaderData = {
  ENV: ReturnType<typeof getEnv>
  user: User
  tokens: AuthTokens
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const data: LoaderData = {
    ENV: getEnv(),
    user,
    tokens
  }

  return json(data)
}

export function App() {
  const data = useLoaderData<LoaderData>()
  const [_, setUser] = useRecoilState(userState)

  useEffect(() => {
    console.log('Changing data. Calling useEffect on root.tsx.')
    setUser(data.user)
    SpotifyClientApi.init(
      data.ENV.SPOTIFY_CLIENT_ID,
      data.ENV.SPOTIFY_CLIENT_SECRET,
      data.tokens
    )
  }, [data])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`
          }}
        />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  const location = useLocation()

  return (
    <html lang="en" className="dark">
      <head>
        <title>Oh no...</title>
        <Links />
      </head>
      <body className="dark:bg-gray-900 bg-white transition duration-500">
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>{location.pathname} is currently not working. So sorry.</p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <html lang="en" className="dark">
      <head>
        <title>Oh no...</title>
        <Links />
      </head>
      <body className="dark:bg-gray-900 bg-white transition duration-500">
        <div>
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </div>
        <Scripts />
      </body>
    </html>
  )
}
