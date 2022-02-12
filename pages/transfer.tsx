import { useState, useEffect, useRef } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"
import Button from "../components/Button"
import SearchBar from "../components/SearchBar"
import { debounce } from "lodash"


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
    firstName: string
    lastName?: string
    username: string
    phoneNumber: string
    cash: number
    history: Array<Transaction>
  }
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

const Transfer: NextPage<PageProps> = ({ user }) => {
  const [searchState, setSearchState] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')

  const searchUsers: Function = (query: String) => {

  }

  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      setQuery(await searchUsers(query))
    }, 300)
  ).current

  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchBar setSearchState={setSearchState} setQuery={setQuery} query={query} />
        
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
