import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
} from '@heroicons/react/outline'
import { Form } from 'remix'
import _ from 'lodash'
import { useState } from 'react'

import type { Playlist } from '~/types'

const items = {
  home: {
    title: 'Home',
    icon: <HomeIcon className="w-5 h-5" />
  },
  search: {
    title: 'Search',
    icon: <SearchIcon className="w-5 h-5" />
  },
  library: {
    title: 'Your Library',
    icon: <LibraryIcon className="w-5 h-5" />
  },
  createPlaylist: {
    title: 'Create Playlist',
    icon: <PlusCircleIcon className="w-5 h-5" />
  },
  likedSongs: {
    title: 'Liked Songs',
    icon: <HeartIcon className="w-5 h-5" />
  },
  yourEpisodes: {
    title: 'Your Episodes',
    icon: <RssIcon className="w-5 h-5" />
  }
}

const SidebarButton = ({ item }: SidebarButtonProps) => (
  <button className="flex items-center space-x-2 hover:text-white">
    {item.icon}
    <p>{item.title}</p>
  </button>
)

const SidebarDivider = () => <hr className="border-t-[0.1px] border-gray-900" />

type Props = {
  playlists: Playlist[]
}

const Sidebar = ({ playlists }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  console.log('You selected the playlist >>> ' + playlistId)

  return (
    <div className="text-gray-500 p-5 text-sm border-gray-900 border-r overflow-y-scroll scrollbar-hide h-screen pr-16">
      <div className="space-y-4">
        <Form action="/logout" method="post">
          <button className="cursor-pointer hover:text-white">Logout</button>
        </Form>
        <SidebarButton item={items.home} />
        <SidebarButton item={items.search} />
        <SidebarButton item={items.library} />
        <SidebarDivider />
        <SidebarButton item={items.createPlaylist} />
        <SidebarButton item={items.likedSongs} />
        <SidebarButton item={items.yourEpisodes} />
        <SidebarDivider />

        {_.map(playlists, playlist => {
          return (
            <p
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
              className="cursor-pointer hover:text-white">
              {playlist.name}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar

type SidebarItem = {
  title: string
  icon: JSX.Element
}

type SidebarButtonProps = {
  item: SidebarItem
}
