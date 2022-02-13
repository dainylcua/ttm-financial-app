import { useState } from "react"
import type { NextPage, GetServerSideProps } from "next"
import Head from "next/head"
import Container from "../../../components/Container"
import BackButton from "../../../components/BackButton"
import FinalNumpad from "../../../components/FinalNumpad"
import { useUserContext } from "../../../context/UserContext"
import FinalButton from "../../../components/FinalButton"
import { useAmountContext } from "../../../context/AmountContext"


export const getServerSidePaths = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_USER_URL as string, {
    method: "GET",
  })
  console.log(res)
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
  const userContext = useUserContext()
  const { amount } = useAmountContext()
  const loggedUser = userContext.user
  const [transferState, setTransferState] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className={`relative flex flex-col text-center ease-in-out`}>
          <BackButton />
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex flex-col justify-center w-12 h-12 my-2 text-center border rounded-full">{user.username.slice(0,1).toUpperCase()}</div>
            <div className="text-lg">
              {user.firstName} {user.lastName? user.lastName : null}
            </div>
            <div className="text-2xl font-bold">
              @{user.username}
            </div>
          </div>
        </div>
        <div className={`flex flex-col justify-center items-center ${transferState ? 'invisible opacity-0 h-0' : 'visible opacity-100 h-100'}`}>
          <FinalNumpad />
          <FinalButton setTransferState={setTransferState}>
            Request Money
          </FinalButton>
        </div>
        <div className={`flex flex-col justify-center items-center ${transferState ? 'visible opacity-100 h-100' : 'invisible opacity-0 h-0' }`}>
          <div className="flex flex-row items-center justify-center pt-24">
            <div className="flex flex-row items-center justify-center w-40 text-7xl">
            <span className="self-start text-2xl">$</span>
              {amount}
            </div>
          </div>
          <div>
            Are you sure?
          </div>
          <FinalButton setTransferState={setTransferState}>
            Request Money
          </FinalButton>
          <FinalButton setTransferState={setTransferState}>
            Cancel
          </FinalButton>
        </div>
      </Container>
    </>
  )
}

export default Requesting
