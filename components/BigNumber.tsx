import { useContext } from "react"
import AmountContext, { useAmountContext } from "../context/AmountContext"




const BigNumber: React.FC = () => {
  const {amount, increment, decrement} = useAmountContext()
  console.log(amount, increment, decrement)

  return (
    <div>

    </div>
  )
}

export default BigNumber