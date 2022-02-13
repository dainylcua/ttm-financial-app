import Link from "next/link"

interface Props {
  children?: React.ReactNode
  href?: string | null
  active?: boolean
}

const SplashButton: React.FC<Props> = ({children, href, active}) => {
  return (
    <Link passHref href={`${href ? `${href}` : "/"}`}>
      <a 
        className={`flex flex-col items-center justify-center w-full flex-grow h-16 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none ${href==`/login` ? "bg-sky-50" : "bg-sky-200"}`}
      >
        {children}
      </a>
    </Link>
  )
}

export default SplashButton