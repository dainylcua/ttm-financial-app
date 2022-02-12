import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"


export async function getServerSideProps() {
  const res = await fetch(process.env.USER_URL as string)
  const users = await res.json()
  console.log(users)

  return {
    props: { users },
  }
}


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        hi
      </Container>
    </>
  )
}

export default Home
