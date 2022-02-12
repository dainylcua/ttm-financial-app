import { MouseEvent } from "react"
import { useAmountContext } from "../context/AmountContext"

const NumpadNumber: React.FC = () => {
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
      <div className="flex flex-row items-center justify-center py-2 mt-16 mb-4">
          <div
            className="flex flex-row items-center justify-center w-40 text-8xl"
          >
            <span className="self-start text-2xl">$</span>
            {amount}
          </div>
      </div>
      <div className="flex flex-col h-64 text-3xl border rounded-lg justify-evenly">
        <div className="flex flex-row items-center justify-between flex-grow px-8 mb-2 text-xl text-center border-b">
          <button onClick={() => setAmount(10)}>$10</button>
          <button onClick={() => setAmount(100)}>$100</button>
          <button onClick={() => setAmount(500)}>$500</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button onClick={addDigit}>7</button>
          <button onClick={addDigit}>8</button>
          <button onClick={addDigit}>9</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button onClick={addDigit}>4</button>
          <button onClick={addDigit}>5</button>
          <button onClick={addDigit}>6</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button onClick={addDigit}>1</button>
          <button onClick={addDigit}>2</button>
          <button onClick={addDigit}>3</button>
        </div>
        <div className="flex flex-row justify-between flex-grow px-12">
          <button className="font-bold" onClick={deleteDigit}>←</button>
          <button onClick={addDigit}>0</button>
          <div className="invisible">1</div>
        </div>
      </div>
    </div>
  )
}

export default NumpadNumber