import { createContext, useContext, useState } from "react"

interface AmountContextInterface {
  amount: number
  setAmount: Function
}

const AmountContext = createContext<AmountContextInterface>({amount: 0, setAmount: (() => {})})

export const AmountProvider: React.FC = ({ children }) => {
  const [amount, setAmount] = useState(0)

  return(
    <AmountContext.Provider value={{amount, setAmount}}>{ children }</AmountContext.Provider>
  )
}

export const useAmountContext = () => useContext(AmountContext)

export default AmountProvider