import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <h2 className="text-white text-2xl font-black">CRM</h2>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === '/' ? 'bg-gray-700 p-3' : 'p-3'}>
          <Link href="/">
            <a className="text-white mb-2 block">
              Customers
            </a>
          </Link>
        </li>
        <li className={router.pathname === '/orders' ? 'bg-gray-700 p-3' : 'p-3'}>
          <Link href="/orders">
            <a className="text-white mb-2 block">
              Orders
            </a>
          </Link>
        </li>
        <li className={router.pathname === '/products' ? 'bg-gray-700 p-3' : 'p-3'}>
          <Link href="/products">
            <a className="text-white mb-2 block">
              Products
            </a>
          </Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar