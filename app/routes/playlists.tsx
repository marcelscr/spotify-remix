import { useRecoilState } from 'recoil'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Outlet } from 'remix'
import { useEffect } from 'react'

import { authenticator } from '~/services/auth.server'
import type { SimplifiedPlaylist, User } from '~/types'
import { playlistsState } from '~/atoms/playlists'
import Layout from '~/components/Layout'
import spotifyApi from '~/lib/spotify.server'

export const loader: LoaderFunction = async ({ request }) => {
  const { tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const api = await spotifyApi(request, tokens)
  const userPlaylists = await api
    .getUserPlaylists()
    .then(data => data.body.items)
  const featuredPlaylists = await api
    .getFeaturedPlaylists()
    .then(data => data.body.playlists.items)
  const playlists = [...userPlaylists, ...featuredPlaylists]

  return {
    playlists
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlists - Remix'
  }
}

export default function Index() {
  const data = useLoaderData<{
    user: User
    playlists: SimplifiedPlaylist[]
  }>()
  const [, setPlaylists] = useRecoilState(playlistsState)

  useEffect(() => {
    setPlaylists(data.playlists)
  }, [data])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
