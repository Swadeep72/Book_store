import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../../redux/features/bookSlice';
import { useDispatch } from 'react-redux';
import { GrLanguage } from "react-icons/gr"
import { FaCartShopping, FaHeart } from 'react-icons/fa6';

const BookDetails = () => {

    const { id } = useParams();
    const [book, setBook] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBook(id)).unwrap()
            .then(res => res?.status ? setBook(res?.data) : toast.error(res?.message))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {book && <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row flex gap-8 items-start'>
                <div className='w-full lg:w-3/6'>
                    <div className='flex justify-around bg-zinc-800 rounded p-12 '>
                        <img src={"https://m.media-amazon.com/images/I/713iGaS3K7L._SX342_SY445.jpg" || book?.url} alt={book?.title} className='h-[50vh] lg:h-[70vh] rounded' />
                        <div className='flex md:flex-col'>
                            <button className='bg-white rounded-full text-3xl p-3 text-red-500'>
                                <FaHeart />
                            </button>
                            <button className='bg-white rounded-full text-3xl p-3 mt-8 text-blue-500'>
                                <FaCartShopping />
                            </button>
                        </div>
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
