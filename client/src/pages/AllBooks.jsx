import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllBooks } from '../../redux/features/bookSlice'
import BookCard from '../components/BookCard/BookCard'
import Loader from '../components/Loader/Loader'

const AllBooks = () => {

    const [books, setBooks] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllBooks()).unwrap()
            .then(res => res?.status ? setBooks(res?.data) : toast.error(res?.message))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='bg-zinc-900 h-auto px-12 py-8'>
            <h4 className='text-3xl text-yellow-100'>All Books</h4>
            {!books && <Loader />}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4 gap-4'>
                {!!books?.length && books?.map(book => <BookCard key={book._id} book={book} />)}
            </div>
        </div>
    )
}

export default AllBooks
