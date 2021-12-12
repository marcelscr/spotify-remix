import LayoutHeader from './LayoutHeader'
import Sidebar from './Sidebar'
import Player from './Player'

type Props = {
  children: JSX.Element
}

function Layout({ children }: Props) {
  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <LayoutHeader />
            {children}
          </div>
        </div>
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default Layout
