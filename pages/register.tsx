import Layout from "../components/Layout"
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Register = () => {

  const formik = useFormik({
    onSubmit: values => console.log('values', values),
    validationSchema: Yup.object({
      name: Yup.string().required('Name is mandatory'),
      email: Yup.string().email('Invalid Email'),
      password: Yup.string().required('Password is mandatory').min(6, 'min password is 6 characters')
    }),
    initialValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">
        Register
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="name">
                Name
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:border-yellow-700"
                id="name"
                type="name"
                placeholder="User Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            { formik.errors.name && formik.touched.name? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : (null)
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                Email
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:border-yellow-700"
                id="email"
                type="email"
                placeholder="User Email"
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
              type="submit"
              className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
