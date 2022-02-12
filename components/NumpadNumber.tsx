import { useAmountContext } from "../context/AmountContext"

const NumpadNumber: React.FC = () => {
  const { amount, setAmount } = useAmountContext()

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center py-2 my-16">
          <div
            className="flex flex-row items-center justify-center w-40 text-8xl"
          >
            <span className="self-start text-2xl">$</span>
            {amount}
          </div>
      </div>
      <div className="h-40 border rounded-lg">
      </div>
    </div>
  )
}

export default NumpadNumber