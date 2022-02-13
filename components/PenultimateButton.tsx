import Link from "next/link"

interface Props {
  children?: React.ReactNode
  href: string | null
  paying: boolean
}

const PenultimateButton: React.FC<Props> = ({children, href, paying}) => {
  return (
    <Link passHref href={`${paying ? `${href}/paying` : `${href}/requesting`}`}>
      <a 
        className="flex flex-col items-center justify-center w-24 h-10 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
      >
        {children}
      </a>
    </Link>
  )
}

export default PenultimateButton