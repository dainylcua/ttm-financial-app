import { createContext, useContext, useState } from "react"

interface AmountContextInterface {
  amount: number
  increment: Function
  decrement: Function
}

const AmountContext = createContext<AmountContextInterface>({amount: 0, increment: (() => {}), decrement: (() => {})})

export const AmountProvider: React.FC = ({ children }) => {
  const [amount, setAmount] = useState(0)
  const increment = () => setAmount((prevAmount) => prevAmount++)
  const decrement = () => setAmount((prevAmount) => prevAmount--)

  return(
    <AmountContext.Provider value={{amount, increment, decrement}}>{ children }</AmountContext.Provider>
  )
}

export const useAmountContext = () => useContext(AmountContext)

export default AmountProvider