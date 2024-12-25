import { useState } from "react";
import { FaGripLines } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {

    const handleHamburger = () => setPhoneNav(prev => prev === "hidden" ? "block" : "hidden")
    const [phoneNav, setPhoneNav] = useState("hidden");
    const links = [
        { name: "Home", link: "/" },
        // { name: "About", link: "/about" },
        { name: "All Books", link: "/explore" },
        { name: "Cart", link: "/cart" },
        { name: "Profile", link: "/profile" }
    ]
    return <>
        <nav className='z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between'>
            <Link to="/" className='flex items-center justify-between gap-4'>
                <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
                <h2 className='text-2xl font-semibold'>Bookstore</h2>
            </Link>
            <div className='nav-links-bookheaven block md:flex items-center gap-4'>
                <div className='hidden md:flex gap-4'>
                    {links?.map(({ name, link }, i) => <Link to={link} key={i} className='hover:text-blue-500 transition-all duration-300'>{name}</Link>)}
                </div>
                <div className='hidden md:flex gap-4'>
                    <Link to="/login" className='px-4 py-1 border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
                    <Link to="/sign-up" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Sign Up</Link>
                </div>
                <button className="block md:hidden text-white text-2xl hover:text-zinc-200" onClick={handleHamburger}>
                    <FaGripLines />
                </button>
            </div>
        </nav>
        <div className={`${phoneNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-4`}>
            {links?.map(({ name, link }, i) => <Link to={link} onClick={handleHamburger}  key={i} className={`${phoneNav} text-white text-4xl font-semibold hover:text-blue-500 transition-all duration-300`}>{name}</Link>)}
            <Link to="/login" onClick={handleHamburger}  className={`${phoneNav} px-8 mb-8 text-3xl font-semibold py-2 border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
            <Link to="/sign-up" onClick={handleHamburger}  className={`${phoneNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Sign Up</Link>
        </div>
    </>
}

export default Navbar;