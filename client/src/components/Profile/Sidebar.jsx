import { FaArrowRightFromBracket } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"

const Sidebar = ({ user }) => {

    const navigate = useNavigate()
    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
            <div className="flex items-center flex-col justify-center">
                <img src={user?.avatar} className="h-[12vh]" />
                <p className="mt-3 text-xl text-zinc-100 font-semibold">
                    {user?.userName}
                </p>
                <p className="mt-1 text-normal text-zinc-300">{user?.email}</p>
                <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
            </div>
            <div className="w-full flex-col items-center justify-center hidden lg:flex">
                <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Favourites
                </Link>
                <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Order History
                </Link>
                <Link to="/profile/settings" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                    Settings
                </Link>
            </div>
            <button className="bg-zinc-900 w3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded transition-all duration-300 hover:text-zinc-900" onClick={() => {
                localStorage?.clear()
                navigate("/")
                window.location.reload()
            }}>
                Log Out <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    )
}

export default Sidebar
