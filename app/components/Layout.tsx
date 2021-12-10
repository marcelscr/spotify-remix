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
          <LayoutHeader />
          {children}
        </div>
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}

export default Layout
