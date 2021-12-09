import type { MetaFunction, LoaderFunction } from 'remix'
import { redirect } from 'remix'

import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return redirect('/playlists')
}

export const meta: MetaFunction = () => {
  return {
    title: 'Spotify - Remix',
    description: 'Welcome to the remix Spotify!'
  }
}
