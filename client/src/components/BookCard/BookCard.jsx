import { Link } from "react-router-dom"

const BookCard = ({ book }) => {
    return (
        <>
            <Link to={`/view-book-details/${book?._id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 flex items-center justify-center">
                        <img src={"https://m.media-amazon.com/images/I/713iGaS3K7L._SX342_SY445.jpg"||book?.url} alt={book?.title} className="h-[25vh]" />
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