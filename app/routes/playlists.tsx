import { useRecoilState } from 'recoil'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, Outlet } from 'remix'
import { useEffect } from 'react'

import { authenticator } from '~/services/auth.server'
import type { SimplifiedPlaylist, User } from '~/types'
import { userState } from '~/atoms/user'
import { playlistsState } from '~/atoms/playlists'
import Layout from '~/components/Layout'
import { getUserPlaylists, getFeaturedPlaylists } from '~/lib/request'

export const loader: LoaderFunction = async ({ request }) => {
  const { user, tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const userPlaylists = await getUserPlaylists(request, tokens)
  const featuredPlaylists = await getFeaturedPlaylists(request, tokens)
  const playlists = [...userPlaylists, ...featuredPlaylists]

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
