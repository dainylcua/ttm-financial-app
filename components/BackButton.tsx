import { useRouter } from "next/router"


const BackButton = () => {
  const router = useRouter()
  return (
    <button className="absolute top-0 left-0 text-5xl scale-150 h-fit" onClick={() => router.back()}>
      &#8249;
    </button>
  )
}

export default BackButton