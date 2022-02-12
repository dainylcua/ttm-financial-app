import { useAmountContext } from "../context/AmountContext"
import Link from "next/link"

const BigNumber: React.FC = () => {
  const { amount, setAmount, } = useAmountContext()

  return (
    <div className="flex flex-col py-2 mt-16 mb-10">
      <div className="flex flex-row items-center justify-center">
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
      <div className={`${amount == 999 ? 'visible' : 'invisible'} my-2 text-red-500 opacity-70 animate-pulse ease-in-out`}>
        Maximum transferable amount is $999.
      </div>
    </div>
  )
}

export default BigNumber