import LayoutHeader from './LayoutHeader'
import Sidebar from './Sidebar'

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
      <div>{/* Player */}</div>
    </div>
  )
}

export default Layout
