
interface Props {
  children?: React.ReactNode
}

const SplashContainer: React.FC<Props> = ({children}) => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-200">
      <div className="flex-1 flex flex-col mx-auto w-[350px] my-auto max-h-[40rem] bg-sky-700 border shadow-2xl border-sky-600 shadow-gray-400 rounded-xl p-8">
        {children}
      </div>
    </div>
  )
}

export default SplashContainer