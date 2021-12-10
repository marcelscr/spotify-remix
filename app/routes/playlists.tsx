import { useRecoilState } from 'recoil'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Outlet } from 'remix'
import { playlistsState } from '~/atoms/playlists'
import { useEffect } from 'react'

import spotifyApi from '~/lib/spotify'
import { authenticator } from '~/services/auth.server'
import type { SimplifiedPlaylist, User } from '~/types'
import { userState } from '~/atoms/user'
import Layout from '~/components/Layout'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
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

  console.log(params)

  return {
    playlists,
    user
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
  const [_, setPlaylists] = useRecoilState(playlistsState)
  const [__, setUser] = useRecoilState(userState)

  useEffect(() => {
    setPlaylists(data.playlists)
    setUser(data.user)
  }, [data])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
