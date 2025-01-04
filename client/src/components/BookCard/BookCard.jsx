import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavouites, removeFavourites } from "../../../redux/features/favouriteSlice";
import { toast } from "react-toastify";
import { getUserProfile } from "../../../redux/features/userSlice";

const BookCard = ({ book }) => {

    const { user } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    const handleFavourite = () => {
        const action = user?.favourites?.includes(book?._id) ? removeFavourites(book?._id) : addToFavouites(book?._id);
        dispatch(action).unwrap()
            .then(res => {
                if (res?.status) {
                    toast.success(res?.message)
                    dispatch(getUserProfile())
                } else {
                    toast.error(res?.message)
                }
            })
            // .then(({ status, message }) => toast[status ? "success" : "error"](message))
            // .then(res => res?.status ? toast.success(res?.message) : toast.error(res?.message))
            .catch(err => console.log(err))
        dispatch(getUserProfile())
    }
    return (
        <>
            <Link to={`/view-book-details/${book?._id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 flex items-center justify-center relative">
                        <img src={"https://m.media-amazon.com/images/I/713iGaS3K7L._SX342_SY445.jpg" || book?.url} alt={book?.title} className="h-[25vh]" />
                        <button className={`bg-white rounded lg:rounded-full text-xl p-2 text-${!user?.favourites?.includes(book?._id) ? "zinc-800" : "red-500"} flex items-center justify-center absolute top-0 right-0 z-1`} onClick={handleFavourite}>
                            <FaHeart />
                        </button>
                    </div>
                    <h2 className="mt-4 text-xl text-white font-semibold">{book?.title}</h2>
                    <p className="mt-2 text-zinc-200 font-semibold">by {book?.author}</p>
                    <p className="mt-2 text-zinc-200 font-semibold text-xl">$ {book?.price}</p>
                </div>
            </Link>
        </>
    )
}

export default BookCard;