import { useRouter } from "next/router"


const BackButton = () => {
  const router = useRouter()
  return (
    <button className="text-xl scale-150 h-fit" onClick={() => router.back()}>
      &#8249;
    </button>
  )
}

export default BackButton