import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { getRecentBooks } from '../../../redux/features/bookSlice'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentAdded = () => {

    const [books, setBooks] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecentBooks()).unwrap()
            .then(res => res?.status ? setBooks(res?.data) : toast.error(res?.message))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            {!books && <Loader />}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4 gap-8'>
                {!!books?.length && books?.map(book => <BookCard key={book._id} book={book} />)}
            </div>
        </div>
    )
}

export default RecentAdded
