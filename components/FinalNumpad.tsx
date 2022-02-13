import { MouseEvent } from "react"
import { useAmountContext } from "../context/AmountContext"

const FinalNumpad: React.FC = () => {
  const { amount, setAmount } = useAmountContext()

  const deleteDigit = () => {
    setAmount((prev:number) => {
      const str = prev.toString()
      if(str.length == 1) return 0
      return parseInt(str.slice(0, str.length-1))
    })
  }

  const addDigit = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element
    setAmount((prev:number) => {
      const str = prev.toString()
      return parseInt(str+target.innerHTML)
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center mb-1">
          <div
            className="flex flex-row items-center justify-center w-40 text-5xl"
          >
            <span className="self-start text-xl">$</span>
            {amount}
          </div>
      </div>
      <div className={`${amount == 999 ? 'visible' : 'invisible'} my-1 text-red-500 opacity-70 animate-pulse ease-in-out`}>
        Maximum transferable amount is $999.
      </div>
      <div className="flex flex-col text-xl border rounded-lg h-54 justify-evenly gap-y-2">
        <div className="flex flex-row items-center justify-between flex-grow px-8 mb-2 text-lg text-center border-b">
          <button className="transition-transform active:scale-90" onClick={() => setAmount(10)}>$10</button>
          <button className="transition-transform active:scale-90" onClick={() => setAmount(100)}>$100</button>
          <button className="transition-transform active:scale-90" onClick={() => setAmount(500)}>$500</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button className="transition-transform active:scale-90" onClick={addDigit}>7</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>8</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>9</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button className="transition-transform active:scale-90" onClick={addDigit}>4</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>5</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>6</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button className="transition-transform active:scale-90" onClick={addDigit}>1</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>2</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>3</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12 mb-2">
          <button className="font-bold transition-transform active:scale-90" onClick={deleteDigit}>←</button>
          <button className="transition-transform active:scale-90" onClick={addDigit}>0</button>
          <div className="invisible">1</div>
        </div>
      </div>
    </div>
  )
}

export default FinalNumpad