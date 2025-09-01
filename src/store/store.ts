import {configureStore} from '@reduxjs/toolkit'
// import productSlice from '../features/product/productSlice'
import { getTotal } from '../features/product/cartSlice'
import { productApi } from '../features/product/productAPI'
import cartReducer from '../features/product/cartSlice'
import authReducer from '../features/product/authSlice'


const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
        auth: authReducer,
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware),

})

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// store.dispatch(fetchProducts());
store.dispatch(getTotal());

 