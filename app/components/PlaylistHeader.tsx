import { useState, useEffect } from 'react'
import { sample } from 'lodash'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

type Props = {
  title?: string
  subtitle?: string
  imageUrl?: string
}

const PlaylistHeader = ({ title, subtitle, imageUrl }: Props) => {
  const [color, setColor] = useState('')

  useEffect(() => {
    setColor(sample(colors) ?? colors[0])
  }, [title])

  return (
    <div
      className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-8 `}>
      <img
        className="w-44 h-44 shadow-2xl rounded-lg"
        src={imageUrl}
        alt="playlist image"
      />
      <div>
        {subtitle && <p>{subtitle}</p>}
        <h1 className="text-2xl md:text-3xl xl:text-5lx font-bold">{title}</h1>
      </div>
    </div>
  )
}

export default PlaylistHeader
