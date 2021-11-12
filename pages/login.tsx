import Layout from "../components/Layout"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from 'next/router'

const QUERY_SIGNIN = gql`
  mutation SignIn($input: AuthInput) {
    signIn(input: $input) {
      token
    }
  }
`



const Login = () => {

  const [ signIn ] = useMutation(QUERY_SIGNIN)
  const [ message, setMessage ] = useState<string|null>(null)
  const router = useRouter()

  const formik = useFormik({
    onSubmit: async (values: any) => {
      const { email, password } = values
      setMessage('Login...')
      try {
        const { data } = await signIn({
          variables: {
            input: {
              email,
              password
            }
          }
        })
        
        const { token } = data.signIn
        localStorage.setItem('token', token)
        router.push('/')
      } catch(error: any) {
        setMessage(error.message)
        setTimeout(() => setMessage(null), 3000)
      }
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required(),
      password: Yup.string().required()
    })
  })

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">
        Login
      </h1>

      {message && showMessage()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:border-yellow-700"
                id="email"
                type="email"
                placeholder="User Email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.errors.email && formik.touched.email? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : (null)
            }

             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                Password
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:border-yellow-700"
                id="password"
                type="password"
                placeholder="User Password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.errors.password && formik.touched.password? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : (null)
            }

            <button 
              className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              type="submit"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
