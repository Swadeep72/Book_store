import { configureStore } from '@reduxjs/toolkit';
import errorMiddleware from "./middlewares/errorMiddleware";
import userSlice from "./features/userSlice"
import bookSlice from "./features/bookSlice"
import orderSlice from "./features/orderSlice"
import cartSlice from "./features/cartSlice"
import favouriteSlice from "./features/favouriteSlice"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    book: bookSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    favourite: favouriteSlice.reducer,
  },
  // middleware: mid => mid().concat(errorMiddleware)
})

export default store;