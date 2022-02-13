import { createContext, useContext, useState } from "react"
import { useRouter } from "next/router"

interface User {
    _id: string
    firstName: string
    lastName?: string
    username: string
    phoneNumber: string
    cash: number
    history: Array<Transaction>
}

interface UserContextInterface {
  user: User
  login: Function
  signup: Function
}

interface Transaction {
  senderId?: string
  senderUsername?: string,
  senderFirstName?: string,
  senderLastName?: string,
  receiverId?: string,
  receiverUsername?: string,
  receiverFirstName?: string,
  receiverLastName?: string,
  cashflow?: Number
}

const defaults = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    cash: 5000,
    history: [{}]
  },
  login: (() => {}), 
  signup: (() => {})
}

const UserContext = createContext<UserContextInterface>(defaults)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(defaults.user)
  const router = useRouter()

  const logout = async () => {
    setUser(defaults.user)
    router.push("/")
  }

  const login = async (username: string, phoneNumber: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/login/${username}/${phoneNumber}` as string, {
        method: "GET",
        headers: {
          "Content-Type": "Application/JSON"
        }
      })
      const data = await res.json()
      if(data.success == true) {
        const user = data.data
        setUser({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          phoneNumber: user.phoneNumber,
          cash: user.cash,
          history: user.history
        })
        router.push("/")
        return
      } else {
        logout()
        throw Error("No users found with that information")
      }
    } catch (error) {
      console.log("Error finding user with given information", error)
    }
  }

  const signup = async (body: User) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_USER_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if(data.success) {
        const user = data.data
        login(user.username, user.phoneNumber)
      } else {
        logout()
        throw Error(data.error)
      }
    } catch (error) {
      console.log("Error creating user with given information", error)
    }
  }

  return(
    <UserContext.Provider value={{user, login, signup}}>{ children }</UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)

export default UserProvider