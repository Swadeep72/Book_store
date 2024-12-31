import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { object, string } from "yup"
import { userLogin } from "../../redux/features/userSlice"
import { toast } from "react-toastify";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validation = object({
        userName: string().required("Name is required"),
        password: string().required("Password is required"),
    })
    return (
        <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
                <p className='text-zinc-200 text-xl'>Login</p>
                <Formik
                    initialValues={{ userName: "", password: "" }}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        console.log(values, "values")
                        dispatch(userLogin(values)).unwrap().then(res => {
                            console.log(res)
                            if (res?.status) {
                                toast.success(res?.message)
                                document.cookie = `token=${res?.data?.token}`;
                                localStorage.setItem("token", res?.data?.token)
                                localStorage.setItem("user", JSON.stringify(res?.data))
                                navigate("/");
                            } else {
                                toast.error(res?.message)
                            }
                        }).catch(err => {
                            console.log(err);
                            toast.error("Something went wrong.")
                        })
                    }}
                >
                    <Form className="mt-4">
                        <div>
                            <label htmlFor="" className="text-zinc-400">Username</label>
                            <Field type="text" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Username' name='userName' />
                            <ErrorMessage component={"span"} className="text-red-600" name="userName" />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="" className="text-zinc-400">Password</label>
                            <Field type="password" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Password' name='password' />
                            <ErrorMessage component={"span"} className="text-red-600" name="password" />
                        </div>
                        <div className='mt-4'>
                            <button type="submit" className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:opacity-50'>Login</button>
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
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login
