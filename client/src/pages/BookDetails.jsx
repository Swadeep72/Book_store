import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteBook, getBook, updateBook } from '../../redux/features/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GrLanguage } from "react-icons/gr"
import { MdOutlineDelete } from 'react-icons/md';
import { addToFavouites, removeFavourites } from '../../redux/features/favouriteSlice';
import { addToCart } from '../../redux/features/cartSlice';
import { FaCartShopping, FaCreditCard, FaHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { getUserProfile } from '../../redux/features/userSlice';

const BookDetails = () => {

    const { isLogin, user } = useSelector(({ user }) => user)
    const { id } = useParams();
    const [book, setBook] = useState([])
    const dispatch = useDispatch()
    console.log({ isLogin, fav: user?.favourites })

    useEffect(() => {
        dispatch(getBook(id)).unwrap()
            .then(res => res?.status ? setBook(res?.data) : toast.error(res?.message))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        dispatch(deleteBook(id)).unwrap()
            .then(({ status, message }) => toast[status ? "success" : "error"](message))
            // .then(res => res?.status ? toast.success(res?.message) : toast.error(res?.message))
            .catch(err => console.log(err))
    }

    const handleEdit = () => {
        dispatch(updateBook(id)).unwrap()
            .then(({ status, message }) => toast[status ? "success" : "error"](message))
            // .then(res => res?.status ? toast.success(res?.message) : toast.error(res?.message))
            .catch(err => console.log(err))
    }

    const handleFavourite = () => {
        const action = user?.favourites?.includes(id) ? removeFavourites(id) : addToFavouites(id);
        dispatch(action).unwrap()
            // .then(({ status, message }) => toast[status ? "success" : "error"](message))
            // .then(res => res?.status ? toast.success(res?.message) : toast.error(res?.message))
            .then(res => {
                if (res?.status) {
                    toast.success(res?.message)
                    dispatch(getUserProfile())
                } else {
                    toast.error(res?.message)
                }
            })
            .catch(err => console.log(err))
    }

    const handleCart = () => {
        dispatch(addToCart(id)).unwrap()
            .then(({ status, message }) => toast[status ? "success" : "error"](message))
            // .then(res => res?.status ? toast.success(res?.message) : toast.error(res?.message))
            .catch(err => console.log(err))
    }

    return (
        <>
            {book && <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row flex gap-8 items-start'>
                <div className='w-full lg:w-3/6'>
                    <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12 '>
                        <img src={"https://m.media-amazon.com/images/I/713iGaS3K7L._SX342_SY445.jpg" || book?.url} alt={book?.title}
                            className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                        {isLogin && <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 flex items-center justify-center'>
                            <button className={`bg-white rounded lg:rounded-full text-3xl p-3 text-${!user?.favourites?.includes(id) ? "zinc-800" : "red-500"} flex items-center justify-center`} onClick={handleFavourite}>
                                <FaHeart /> <span className='ms-4 lg:hidden'>Add to favourites</span>
                            </button>
                            <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}>
                                <FaCartShopping /> <span className='ms-4 lg:hidden'>Add to cart</span>
                            </button>
                            {/* {isLogin && role === "admin" && <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 flex items-center justify-center'> */}
                            {isLogin && user?.role === "admin" && <> <button className='bg-white rounded mt-8 md:mt-0 lg:mt-8 lg:rounded-full text-3xl p-3 flex items-center justify-center' onClick={handleEdit}>
                                <FaCreditCard /> <span className='ms-4 lg:hidden'>Edit</span>
                            </button>
                                <button className='text-red-500 rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center' onClick={handleDelete}>
                                    <MdOutlineDelete /> <span className='ms-4 lg:hidden'>Delete book</span>
                                </button></>}
                            {/* </div>} */}
                        </div>}
                    </div>
                </div>
                <div className='p-4 w-full lg:w-3/6'>
                    <h1 className='text-zinc-300 text-4xl font-semibold'>{book?.title}</h1>
                    <p className='text-zinc-400 mt-1'>by {book?.author}</p>
                    <p className='text-zinc-500 mt-4 text-xl'>{book?.description}</p>
                    <p className='flex mt-4 items-center justify-start text-zinc-400 gap-2'><GrLanguage />{book?.language}</p>
                    <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : $ {book?.price}</p>
                </div>
            </div>}
            {!book && <div className='flex justify-center items-center bg-zinc-900 h-screen'><Loader /></div>}
        </>
    )
}

export default BookDetails
