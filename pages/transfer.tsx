import React, { useState, useEffect, useRef, JSXElementConstructor } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"
import Button from "../components/Button"
import SearchBar from "../components/SearchBar"
import { debounce } from "lodash"
import BigNumber from "../components/BigNumber"


// export async function getServerSideProps() {
//   const res = await fetch(process.env.USER_URL as string)
//   const users = await res.json()
//   const user = users.data[0]
//   console.log(user)

//   return {
//     props: { user },
//   }
// }

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
  const [users, setUsers] = useState<Array<User>>([])

  
  const searchUsers: Function = async (query: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/search/${query}` as string, {
      method: "GET",
      headers: {
        "Content-Type": "Application/JSON"
      }
    })
    const users = await res.json()
    return users.data
  }
  
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      setUsers(await searchUsers(query))
    }, 300)
  ).current
    
  const handleChange: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchBar setSearchState={setSearchState} handleChange={handleChange}/>
        <BigNumber />
        <div className={`flex flex-col text-center transition-opacity ease-in-out ${searchState ? 'invisible opacity-0 h-0' : 'visible opacity-100 h-100'}`}>
          <div className="flex flex-row self-center pb-10 gap-x-8">
            <Button href="/transfer">
              Pay
            </Button>
            <Button href="/signup">
              Request
            </Button>
          </div>

          <div className="text-2xl font-bold">Recent Transactions</div>
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
        
        <div className={`flex flex-col transition-opacity ease-in-out ${searchState ? 'visible opacity-100 h-100' : 'invisible opacity-0 h-0'}`}>
          <div className="py-8 text-2xl font-bold">Results</div>
          {
            users.map((u) => (
              <div className="flex flex-row items-start justify-start w-full" key={u._id}>
                <div className="flex flex-col justify-center w-12 h-12 ml-2 mr-8 text-center border rounded-full">{u.username.slice(0,1).toUpperCase()}</div>
                <div className="flex flex-col text-sm">
                  <div className="text-lg font-medium">
                  @{u.username}
                  </div>
                  <div>
                  {u.firstName} {u.lastName || null}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Container>
    </>
  )
}

export default Transfer
