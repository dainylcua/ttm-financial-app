import Link from "next/link"

interface Props {
  children?: React.ReactNode
  href?: string | null
  onClick? : Function
}

const DashboardButton: React.FC<Props> = ({children, href, onClick}) => {
  return (
    <button onClick={onClick ? () => onClick : undefined}>
      <Link passHref href={`${href ? `${href}` : "/"}`}>
        <a
          className="flex flex-col items-center justify-center h-20 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none w-36 hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
        >
          {children}
        </a>
      </Link>
    </button>
  )
}

export default DashboardButton