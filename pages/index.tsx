import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
const QUERY_GET_CUSTOMER_BY_SELLER = gql`
  query GetCustomersBySeller {
    getCustomersBySeller {
      id
      firstName
      lastName
      company
      email
      phone
      userId
    }
  }
`

const Home: NextPage = () => {

  const { data, loading, error } = useQuery(QUERY_GET_CUSTOMER_BY_SELLER)

  if (loading) return <div>loading...</div>

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Customers</h1>

      Hola daniel
      <div className="bg-green-900 flex max-w-sm align-text-top border-red-400 border-solid text-red-50">
        Hola
      </div>
    </Layout>
  )
}

export default Home
