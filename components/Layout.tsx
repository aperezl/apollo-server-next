import { ReactNode } from "react"
import Head from 'next/head'
import Sidebar from "./Sidebar"
import { useRouter } from "next/router"
type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children }: Props) => {

  const router = useRouter()
  return (
    <>
      <Head>
        <title>Titulo de prueba</title>
      </Head>
      
      {router.pathname === '/login' || router.pathname === '/register' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          {children}
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:q-4/5 sm:min-h-screen p-5">
              {children}
            </main>
          </div>        
        </div>
      )}
      
      
      
    </>
  )
}

export default Layout