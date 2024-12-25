import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios'

const AllBooks = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:1000/books/get-books')
                console.log(response)
                if (response.status === 200) {
                    setBooks([...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data, ...response?.data?.data])
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks()
    }, [])
    console.log(books, "books")

    return (
        <div className='bg-zinc-900 h-auto px-12 py-8'>
            <h4 className='text-3xl text-yellow-100'>All Books</h4>
            {!books && <Loader />}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4 gap-4'>
                {
                    !!books?.length && books?.map(book => {
                        return <BookCard key={book._id} book={book} />
                    })
                }
            </div>
        </div>
    )
}

export default AllBooks
