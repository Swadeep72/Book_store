import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
  return (
    <div className="bg-zinc-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<AllBooks />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view-book-details/:id" element={<BookDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}