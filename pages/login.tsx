import Layout from "../components/Layout"

const Login = () => {
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">
        Login
      </h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
              />
            </div>

             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                Password
              </label>
              <input
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner focus:border-yellow-700"
                id="password"
                type="password"
                placeholder="User Password"
              />
            </div>

            <button 
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

export default Login
