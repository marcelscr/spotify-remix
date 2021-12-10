import Loader from 'react-loader-spinner'

const Loading = () => {
  return (
    <Loader
      type="TailSpin"
      color="#555555"
      height={50}
      width={50}
      timeout={3000}
    />
  )
}

export default Loading
