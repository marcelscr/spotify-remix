import { useRecoilState } from 'recoil'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Outlet } from 'remix'
import { useEffect } from 'react'

import { authenticator } from '~/services/auth.server'
import type { SimplifiedPlaylist, User } from '~/types'
import { playlistsState } from '~/atoms/playlists'
import Layout from '~/components/Layout'
import { getUserPlaylists, getFeaturedPlaylists } from '~/lib/request'
import spotifyApi from '~/lib/spotify.server'

export const loader: LoaderFunction = async ({ request }) => {
  const { tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const api = await spotifyApi(request, tokens)
  const userPlaylists = await getUserPlaylists(api)
  const featuredPlaylists = await getFeaturedPlaylists(api)
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
