import { useEffect, useState } from 'react';
import { getFavourites } from '../../../redux/features/favouriteSlice';
import { useDispatch } from 'react-redux';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {

  const [favourites, setFavourites] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavourites()).unwrap()
      .then(res => res?.status ? setFavourites(res?.data) : toast.error(res?.message))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='grid grid-cols-4 gap-4'>
      {favourites?.map((book, i) => <BookCard book={book} key={i} />)}
    </div>
  )
}

export default Favourites;