import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AmountProvider } from '../context/AmountContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AmountProvider>
      <Component {...pageProps} />
    </AmountProvider>
  )
}

export default MyApp
