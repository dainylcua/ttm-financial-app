import Link from "next/link"

interface Props {
  children?: React.ReactNode,
  href?: String | null
}

const Button: React.FC<Props> = ({children, href}) => {
  return (
    <Link passHref href={`${href ? `${href}` : "/"}}`}>
      <a className="flex flex-col items-center justify-center w-24 h-8 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-neutral-50 active:scale-90 active:bg-sky-700">
        {children}
      </a>
    </Link>
  )
}

export default Button