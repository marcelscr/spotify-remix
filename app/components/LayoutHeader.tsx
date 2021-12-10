import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { userState } from '~/atoms/user'

function LayoutHeader() {
  const user = useRecoilValue(userState)

  if (!user) return null

  return (
    <header className="absolute top-5 right-8">
      <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 p-r-2">
        <img
          className="rounded-full w-10 h-10"
          src={user.image}
          alt="user image"
        />
        <h2>{user.name ?? user.id}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  )
}

export default LayoutHeader
