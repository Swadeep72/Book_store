import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex md:flex-row flex-col items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl text-yellow-100 font-semibold text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-100 text-center lg:text-left">
          Explore our curated collection of books, discover new authors, and find your next favorite read.
        </p>
        <div className="mt-8">
          <Link to="/explore" className="text-yellow-100 border-2 border-yellow-100 text-xl lg:text-2xl font-semibold px-10 py-3 hover:bg-zinc-800 rounded-full">Discover Books</Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
      </div>
    </div>
  )
}

export default Hero;