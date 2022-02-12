import Link from "next/link"

interface Props {
  children?: React.ReactNode,
  href?: string | null
  paying?: boolean
  setButtonState?: Function
}

const Button: React.FC<Props> = ({children, href, paying, setButtonState}) => {
  return (
    <Link passHref href={`${href ? `${href}` : `${paying ? "/trueing" : "/"}`}`}>
      <a 
        className="flex flex-col items-center justify-center w-24 h-10 text-lg font-bold text-center transition-all ease-in-out cursor-pointer select-none hover:text-md drop-shadow-lg bg-sky-600 rounded-xl text-gray-50 active:scale-90 active:bg-sky-700"
        onClick={setButtonState? () => setButtonState((prevState:boolean) => !prevState) : undefined}
      >
        {children}
      </a>
    </Link>
  )
}

export default Button