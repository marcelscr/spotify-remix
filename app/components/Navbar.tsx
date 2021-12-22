import { HomeIcon, SearchIcon, LibraryIcon } from '@heroicons/react/outline'
import { NavLink } from 'remix'
import cn from 'classnames'

const items = {
  home: {
    title: 'Home',
    to: '/',
    icon: <HomeIcon className="w-5 h-5" />
  },
  search: {
    title: 'Search',
    to: '/',
    icon: <SearchIcon className="w-5 h-5" />
  },
  library: {
    title: 'Playlists',
    to: '/playlists',
    icon: <LibraryIcon className="w-5 h-5" />
  }
}

const NavbarButton = ({ item }: NavbarButtonProps) => (
  <NavLink
    to={item.to}
    className={link => (link.isActive ? 'text-white' : 'text-gray-400')}>
    <button className="flex flex-col items-center hover:text-white">
      {item.icon}
      <p className="truncate">{item.title}</p>
    </button>
  </NavLink>
)

type Props = {
  className?: string
}

const Navbar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'bg-gray-900 flex items-center text-xs justify-around pb-4 ',
        className
      )}>
      <NavbarButton item={items.home} />
      <NavbarButton item={items.search} />
      <NavbarButton item={items.library} />
    </div>
  )
}

export default Navbar

type NavbarItem = {
  title: string
  icon: JSX.Element
  to: string
}

type NavbarButtonProps = {
  item: NavbarItem
}
