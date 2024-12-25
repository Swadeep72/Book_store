import Hero from "../components/Home/Hero"
import RecentAdded from "../components/Home/RecentAdded";

const Home = () => {
    return (
        <div className="bg-zinc-900 text-white">
            <Hero />
            <RecentAdded />
        </div>
    )
}

export default Home;