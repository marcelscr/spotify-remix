import { useRecoilValue } from 'recoil'
import { Link } from 'remix'
import { userState } from '~/atoms/user'

function LayoutHeader() {
  const user = useRecoilValue(userState)

  if (!user) return null

  return (
    <div className="relative">
      <header className="absolute top-5 right-8">
        <Link to="/logout">
          <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 md:pr-2">
            <img
              className="rounded-full w-10 h-10"
              src={user.image}
              alt="user image"
            />
            <h2 className="hidden md:inline">{user.name ?? user.id}</h2>
          </div>
        </Link>
      </header>
    </div>
  )
}

export default LayoutHeader
