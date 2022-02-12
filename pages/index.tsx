import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"
import Button from "../components/Button"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="text-3xl font-bold">
          Welcome, TTM!
        </div>
        <div className="flex flex-row self-center py-80 gap-x-8">
          <Button href="/transfer">
            Log In
          </Button>
          <Button href="/signup">
            Sign Up
          </Button>
        </div>
      </Container>
    </>
  )
}

export default Home
