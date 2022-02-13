import type { NextPage, GetServerSideProps } from "next"
import Head from "next/head"
import Container from "../../../components/Container"
import BackButton from "../../../components/BackButton"
import TransferButton from "../../../components/TransferButton"


export const getServerSidePaths = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_USER_URL as string)
  const users = await(res.json())
  console.log(users)
  return {
    fallback: false,
    paths: users.map((u:ResponseUser) => ({ params: { id: u.data._id }}))
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/${context?.params?.id}` as string)
  const foundUser: ResponseUser = await res.json()
  return {
    props: { 
      user: foundUser.data,
      id: foundUser.data._id
    },
  }
}

interface ResponseUser {
  success: boolean,
  data: User
}

interface User {
  _id?: string
  firstName: string
  lastName?: string
  username: string
  phoneNumber: string
  cash: number
  history: Array<Transaction>
}
interface PageProps {
  user: User
  id: string
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
  cashflow?: number
}

const Requesting: NextPage<PageProps> = ({ user, id }) => {
  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="relative flex flex-col text-center transition-opacity ease-in-out">
          <BackButton />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center w-16 h-16 my-8 text-center border rounded-full">{user.username.slice(0,1).toUpperCase()}</div>
            <div className="text-xl">
              {user.firstName} {user.lastName? user.lastName : null}
            </div>
            <div className="text-3xl font-bold">
              @{user.username}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}


export default Requesting
