import LayoutHeader from './LayoutHeader'
import Sidebar from './Sidebar'
import Player from './Player'
import Navbar from './Navbar'

type Props = {
  children: JSX.Element
}

function Layout({ children }: Props) {
  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <Sidebar className="hidden md:inline" />
        <div className="flex-grow overflow-hidden overflow-y-scroll scrollbar-hide h-screen">
          <LayoutHeader />
          {children}
        </div>
      </main>
      <div className="sticky bottom-0">
        <Player />
        <Navbar className="inline md:hidden" />
      </div>
    </div>
  )
}

export default Layout
