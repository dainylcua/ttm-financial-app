interface Props {
  children?: React.ReactNode
  setTransferState: Function
}

const FinalButton: React.FC<Props> = ({children, setTransferState}) => {
  return (
      <button
        className="flex flex-col items-center justify-center w-24 h-16 my-4 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
        onClick={() => setTransferState((prev:boolean) => !prev)}
      >
        {children}
      </button>
  )
}

export default FinalButton