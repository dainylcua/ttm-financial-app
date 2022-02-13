import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AmountProvider } from "../context/AmountContext"
import { UserProvider } from "../context/UserContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AmountProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AmountProvider>
  )
}

export default MyApp
