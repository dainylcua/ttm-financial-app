import type { NextPage } from "next"
import Head from "next/head"
import SplashContainer from "../components/SplashContainer"
import SplashButton from "../components/SplashButton"
import { SyntheticEvent, useState, ChangeEvent } from "react"
import { useUserContext } from "../context/UserContext"

interface FormState {
    firstName: string
    lastName: string
    phoneNumber: string
    username: string
    cash: 5000,
    history: [{}]
}

const SignUp: NextPage = () => {
  const { signup } = useUserContext()
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    cash: 5000,
    history: [{}]
  })

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    signup(formState)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplashContainer>
        <div className="flex flex-col gap-y-[3rem]">
          <div className="pt-12 text-3xl font-bold text-center text-neutral-50">
            Welcome, TTM!
          </div>
          <div className="flex flex-row self-center w-[350px]">
            <SplashButton href="/login">
              Log In
            </SplashButton>
            <SplashButton href="/signup">
              Sign Up
            </SplashButton>
          </div>
        </div>
        <div className="flex flex-col w-[350px] self-center h-[580px] bg-sky-50">
          <form onSubmit={onSubmit} className="flex flex-col items-center justify-center w-full my-auto">
            <div className="w-full px-8 py-4">
              <label htmlFor="firstName">
                <input 
                  className="w-full p-2 rounded-xl" 
                  type="text" 
                  placeholder="First Name" 
                  name="firstName" 
                  value={formState.firstName} 
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className="w-full px-8 py-4">
              <label htmlFor="lastName">
                <input 
                  className="w-full p-2 rounded-xl" 
                  type="text" 
                  placeholder="Last Name (optional)" 
                  name="lastName" 
                  value={formState.lastName}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="w-full px-8 py-4">
              <label htmlFor="username">
                <input
                  className="w-full p-2 rounded-xl"  
                  type="text" 
                  placeholder="Username" 
                  name="username" 
                  value={formState.username}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <div className="w-full px-8 py-4">
              <label htmlFor="phoneNumber">
                <input
                  className="w-full p-2 rounded-xl"  
                  type="tel" 
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                  placeholder="Phone Number (000-000-0000)" 
                  name="phoneNumber" 
                  value={formState.phoneNumber}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
            <input 
              className="flex flex-col items-center justify-center w-24 h-10 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700" 
              type="submit" 
              value="Sign Up" 
            />
          </form>
        </div>
      </SplashContainer>
    </>
  )
}

export default SignUp
