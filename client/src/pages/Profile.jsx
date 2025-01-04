import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { getUserProfile } from "../../redux/features/userSlice"
import Sidebar from "../components/Profile/Sidebar"
import { toast } from "react-toastify"

const Profile = () => {

    const [profile, setProfile] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserProfile()).unwrap().then(res => {
            if (res?.status) {
                setProfile(res?.data)
            } else {
                toast.error(res?.message)
            }
        }).catch(err => toast.error(err))
    }, [])
    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
            <div className="w-full md:w-1/6 h-screen">
                <Sidebar user={profile} />
            </div>
            <div className="w-full md:w-5/6">
                <Outlet />
            </div>
        </div>
    )
}

export default Profile
