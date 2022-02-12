import { useAmountContext } from "../context/AmountContext"
import Link from "next/link"

const BigNumber: React.FC = () => {
  const { amount, setAmount, } = useAmountContext()

  return (
    <div className="flex flex-row items-center justify-center py-2 my-16">
      <button 
        onClick={() => setAmount((prev:number) => prev -= 1)}
        className="text-6xl cursor-pointer select-none"
      >
        -
      </button>
      <Link href="/amount" passHref>
        <a
          className="flex flex-row items-center justify-center w-40 text-7xl"
        >
          <span className="self-start text-2xl">$</span>
          {amount}
        </a>
      </Link>
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