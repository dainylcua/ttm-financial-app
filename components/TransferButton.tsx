interface Props {
  children?: React.ReactNode,
  paying: boolean
  setSearchState: Function
  setTransferState: Function
}

const TransferButton: React.FC<Props> = ({children, paying, setSearchState, setTransferState}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center w-24 h-10 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
      onClick={() => {
        setSearchState((prevState:boolean) => !prevState)
        setTransferState(paying)
      }}
    >
      {children}
    </div>
  )
}

export default TransferButton