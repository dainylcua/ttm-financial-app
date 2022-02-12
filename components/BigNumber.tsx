import { useAmountContext } from "../context/AmountContext"

const BigNumber: React.FC = () => {
  const { amount, setAmount } = useAmountContext()

  return (
    <div className="flex flex-row items-center justify-center py-20">
      <button 
        onClick={() => setAmount((prev:number) => prev -= 1)}
        className="text-6xl cursor-pointer select-none"
      >
        -
      </button>
      <div
        className="px-10 text-5xl"
      >
        $ {amount}
      </div>
      <button 
        onClick={() => setAmount((prev:number) => prev += 1)}
        className="text-6xl cursor-pointer select-none"
      >
      +
      </button>
    </div>
  )
}

export default BigNumber