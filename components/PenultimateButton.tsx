import Link from "next/link"

interface Props {
  children?: React.ReactNode
  href: string | undefined
  paying: boolean
  uid: string | undefined
}

const PenultimateButton: React.FC<Props> = ({children, href, uid, paying}) => {
  return (
    <Link passHref href={`/${paying ? `${href}/${uid}/paying` : `${href}/${uid}/requesting`}`}>
      <a 
        className="flex flex-col items-center justify-center w-24 h-10 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
      >
        {children}
      </a>
    </Link>
  )
}

export default PenultimateButton