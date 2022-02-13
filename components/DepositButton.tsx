interface Props {
  children?: React.ReactNode,
  onClick: Function
}

const DepositButton: React.FC<Props> = ({children, onClick}) => {
  return (
    <div 
    className="flex flex-col items-center justify-center h-20 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none w-36 hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
      onClick={() => onClick()}
    >
      {children}
    </div>
  )
}

export default DepositButton