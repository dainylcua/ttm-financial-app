import { createContext, useContext, useState, useEffect } from "react"

interface AmountContextInterface {
  amount: number
  setAmount: Function
}

const AmountContext = createContext<AmountContextInterface>({amount: 0, setAmount: (() => {})})

export const AmountProvider: React.FC = ({ children }) => {
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    if(amount < 0) setAmount(0)
    if(amount > 999) setAmount(999)
  }, [amount])

  return(
    <AmountContext.Provider value={{amount, setAmount}}>{ children }</AmountContext.Provider>
  )
}

export const useAmountContext = () => useContext(AmountContext)

export default AmountProvider