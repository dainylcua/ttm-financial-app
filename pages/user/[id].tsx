import React, { useState, useEffect, useRef } from "react"
import type { NextPage, GetServerSideProps } from "next"
import Head from "next/head"
import Container from "../../components/Container"
import BackButton from "../../components/BackButton"


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
  console.log(foundUser)

  return {
    props: { 
      user: foundUser.data 
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
  return (
    <>
      <Head>
        <title>TechTogether Miami</title>
        <meta name="description" content="Welcome to our app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div>
          {user.firstName}
        </div>
      </Container>
    </>
  )
}

export default Transfer
