import { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { useDispatch } from "react-redux";
import { getUserProfile, login, setRole, setUserData } from "../redux/features/userSlice";
import Favourites from "./components/Profile/Favourites";
import OrderHistory from "./components/Profile/OrderHistory";
import Settings from "./components/Profile/Settings";

const BookDetails = lazy(() => import("./pages/BookDetails"))
const Footer = lazy(() => import("./components/Footer/Footer"))
const Navbar = lazy(() => import("./components/Navbar/Navbar"))
const AllBooks = lazy(() => import("./pages/AllBooks"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/Signup"))
const Profile = lazy(() => import("./pages/Profile"))
const Cart = lazy(() => import("./pages/Cart"))

export default function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    document.body.classList.add("bg-zinc-900")
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch(login())
      dispatch(getUserProfile())
      // dispatch(setUserData(JSON.parse(localStorage?.getItem("user"))))
      // dispatch(setRole(JSON.parse(localStorage?.getItem("user"))?.role))
    }
  }, [])

  return (
    <div className="bg-zinc-900">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<AllBooks />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view-book-details/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} >
            <Route index element={<Favourites />} />
            <Route path="/profile/orderhistory" element={<OrderHistory />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}