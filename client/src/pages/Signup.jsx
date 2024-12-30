import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validation = object({
        userName: string().required("Name is required"),
        email: string().email("Invalid email").required("Email is required"),
        password: string().required("Password is required"),
        address: string().required("Address is required")
    })
    return (
        <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
                <p className='text-zinc-200 text-xl'>Sign Up</p>
                <Formik
                    initialValues={{ userName: "", email: "", password: "", address: "" }}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        console.log(values, "values")
                        dispatch(signUp(values)).unwrap().then(res => {
                            console.log(res)
                            if (res?.status) {
                                toast.success(res?.message)
                                navigate("/login");
                                // toast.[res?.status ? "success" : "error"](res?.message)
                            } else {
                                toast.error(res?.message)
                            }
                        }).catch(err => toast.error("Something went wrong."))
                    }}
                >
                    {({ values }) => <Form className="mt-4">
                        <div>
                            {/* {console.log(values)} */}
                            <label htmlFor="" className="text-zinc-400">Username</label>
                            <Field type="text" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Username' name='userName' />
                            <ErrorMessage component={"span"} name="userName" className="text-red-700 font-semibold" />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="" className="text-zinc-400">Email</label>
                            <Field type="text" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Email' name='email' />
                            <ErrorMessage component={"span"} name="email" className="text-red-700 font-semibold" />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="" className="text-zinc-400">Password</label>
                            <Field type="password" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Password' name='password' />
                            <ErrorMessage component={"span"} name="password" className="text-red-700 font-semibold" />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="" className="text-zinc-400">Address</label>
                            <Field as="textarea" className="text-white w-full p-2 mt-2 bg-zinc-900 text-zinc-10 outline-none" placeholder='Enter Address' name='address' />
                            <ErrorMessage component={"span"} name="address" className="text-red-700 font-semibold" />
                        </div>
                        <div className='mt-4'>
                            <button type="submit" className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:opacity-50'>Sign Up</button>
                        </div>
                        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
                            Or
                        </p>
                        <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
                            Already have an account? &nbsp;
                            <Link to="/login" className="hover:text-blue-500">
                                <u>Login</u>
                            </Link>
                        </p>
                    </Form>}
                </Formik>
            </div>
        </div>
    )
}

export default Signup;