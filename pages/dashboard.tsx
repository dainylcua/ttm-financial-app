import React, { useState, useEffect, useRef } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Container from "../components/Container"
import Button from "../components/Button"
import DashboardButton from "../components/DashboardButton"
import { useUserContext } from "../context/UserContext"

interface User {
  _id?: string
  firstName: string
  lastName?: string
  username: string
  phoneNumber: string
  cash: number
  history: Array<Transaction>
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

const Transfer: NextPage = () => {
  const { user } = useUserContext()

  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="relative flex flex-col text-center transition-opacity ease-in-out">
          <div className="flex flex-row items-center justify-center pt-24">
            <div className="flex flex-row items-center justify-center w-40 text-7xl">
            <span className="self-start text-2xl">$</span>
              {user.cash}
            </div>
          </div>
          <div className="flex flex-row self-center pt-16 pb-8 gap-x-8">
            <DashboardButton href="/transfer">
              Withdraw $500
            </DashboardButton>
            <DashboardButton href="/signup">
              Deposit $500
            </DashboardButton>
          </div>

          <div className="text-2xl font-bold">Recent Transactions</div>
          <div className="h-32">
            {
              user ?
                user.history.length ?
                  user.history.map((t: Transaction, idx) => (
                    <div className="flex flex-row items-start justify-start w-full my-4 text-center" key={idx}>
                      <div className="flex flex-col justify-center w-12 h-12 ml-2 mr-8 text-center border rounded-full">{user.username.slice(0,1).toUpperCase()}</div>
                      <div className="flex flex-col text-sm">
                        <div className="text-lg font-medium">
                          @{user.username}
                        </div>
                        <div>
                          {user.firstName} {user.lastName || null}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center ml-8 text-xl text-center">
                        {user._id = t.senderId ? '-' : ' '}{t.cashflow}
                      </div>
                  </div>
                  ))
                :
                  'No user history found.'
              :
                'Please log in to view.'
            }
          </div>

          <div className="flex flex-col items-center justify-center">
            <DashboardButton href="/transfer">
              Transfer Money
            </DashboardButton>
          </div>
          
        </div>
      </Container>
    </>
  )
}

export default Transfer
