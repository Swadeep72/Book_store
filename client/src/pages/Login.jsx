import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
                <p className='text-zinc-200 text-xl'>Login</p>
                <div className="mt-4">
                    <div>
                        <label htmlFor="" className="text-zinc-400">Username</label>
                        <input type="text" className="w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Username' name='username' required />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="" className="text-zinc-400">Password</label>
                        <input type="password" className="w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Password' name='password' required />
                    </div>
                    <div className='mt-4'>
                        <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:opacity-50'>Login</button>
                    </div>
                    <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
                        Or
                    </p>
                    <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
                        Don't have an account? &nbsp;
                        <Link to="/sign-up" className="hover:text-blue-500">
                            <u>Sign up</u>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
