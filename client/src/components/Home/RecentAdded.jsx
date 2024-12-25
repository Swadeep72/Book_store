import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentAdded = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:1000/books/get-books/4')
                console.log(response)
                if (response.status === 200) {
                    setBooks([...response?.data?.data, ...response?.data?.data, ...response?.data?.data])
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks()
    }, [])
    console.log(books, "books")
    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
            {!books && <Loader />}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4 gap-8'>
                {
                    !!books?.length && books?.map(book => {
                        return <BookCard key={book._id} book={book} />
                    })
                }
            </div>
        </div>
    )
}

export default RecentAdded
