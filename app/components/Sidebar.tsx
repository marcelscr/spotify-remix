import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
} from '@heroicons/react/outline'
import { Link } from 'remix'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import cn from 'classnames'

import { playlistsState } from '~/atoms/playlists'

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
    <p className="truncate">{item.title}</p>
  </button>
)

const SidebarDivider = () => <hr className="border-t-[0.1px] border-gray-900" />

type Props = {
  className?: string
}

const Sidebar = ({ className }: Props) => {
  const playlists = useRecoilValue(playlistsState)

  return (
    <div
      className={cn(
        'text-gray-500 p-5 text-sm border-gray-900 border-r overflow-y-scroll scrollbar-hide h-screen pr-16 pb-36',
        className
      )}>
      <div className="space-y-4">
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
            <p key={playlist.id}>
              <Link
                to={`/playlists/${playlist.id}`}
                className="cursor-pointer hover:text-white">
                {playlist.name}
              </Link>
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
