import type { NextPage } from "next"
import Head from "next/head"
import SplashContainer from "../components/SplashContainer"
import SplashButton from "../components/SplashButton"
import { SyntheticEvent, useState, ChangeEvent } from "react"

interface FormStateInterface {
    phoneNumber: string
    username: string
}

const SignUp: NextPage = () => {
  const [formState, setFormState] = useState<FormStateInterface>({
    phoneNumber: "",
    username: "",
  })

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
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
              <label htmlFor="username">
                <input
                  className="w-full p-2 rounded-xl"  
                  type="text" 
                  placeholder="Username" 
                  name="username" 
                  value={formState.username}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="w-full px-8 py-4">
              <label htmlFor="phoneNumber">
                <input
                  className="w-full p-2 rounded-xl"  
                  type="tel" 
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                  placeholder="Phone Number" 
                  name="phoneNumber" 
                  value={formState.phoneNumber}
                  onChange={onChange} 
                />
              </label>
            </div>
          </form>
        </div>
      </SplashContainer>
    </>
  )
}

export default SignUp