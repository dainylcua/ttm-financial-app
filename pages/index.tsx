import type { NextPage } from "next"
import Head from "next/head"
import SplashContainer from "../components/SplashContainer"
import SplashButton from "../components/SplashButton"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplashContainer>
        <div className="flex flex-col gap-y-[13rem]">
          <div className="text-3xl font-bold text-center pt-60 text-neutral-50">
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
      </SplashContainer>
    </>
  )
}

export default Home
