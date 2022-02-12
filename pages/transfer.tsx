import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"
import Button from "../components/Button"
import SearchBar from "../components/SearchBar"


export async function getServerSideProps() {
  const res = await fetch(process.env.USER_URL as string)
  const users = await res.json()
  const user = users.data[0]
  console.log(user)

  return {
    props: { user },
  }
}

interface PageProps {
  user: {
    firstName: String
    lastName?: String
    username: String
    phoneNumber: String
    cash: number
    history: Array<Transaction>
  }
}

interface Transaction {
  senderId?: String
  senderUsername?: String,
  senderFirstName?: String,
  senderLastName?: String,
  receiverId?: String,
  receiverUsername?: String,
  receiverFirstName?: String,
  receiverLastName?: String,
  cashflow?: Number
}

const Transfer: NextPage<PageProps> = ({ user }) => {
  const [searchState, setSearchState] = useState<boolean>(false)
  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchBar setSearchState={setSearchState} />
        
        <div className={`flex flex-col text-center transition-opacity ease-in-out ${searchState ? 'invisible opacity-0 h-0' : 'visible opacity-100 h-100'}`}>
          <div className="flex flex-row self-center py-20 gap-x-8">
            <Button href="/transfer">
              Pay
            </Button>
            <Button href="/signup">
              Request
            </Button>
          </div>

          <div className="text-2xl">Recent Transactions</div>
          <div>
            {
              user ?
                user.history.length ?
                  user.history.map((t: Transaction, idx) => (
                    <div key={idx} className="flex w-full">
                      <div>Image</div>
                      <div className="flex flex-col">
                        <div>{t.senderFirstName}</div>
                        <div>{t.senderLastName}</div>
                      </div>
                      <div>{t.cashflow}</div>
                    </div>
                  ))
                :
                  'No user history found.'
              :
                'Please log in to view.'
            }
          </div>
        </div>
        
        <div className={`flex flex-col text-center transition-opacity ease-in-out ${searchState ? 'visible opacity-100 h-100' : 'invisible opacity-0 h-0'}`}>
          hi
        </div>
      </Container>
    </>
  )
}

export default Transfer
