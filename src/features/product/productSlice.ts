import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
    products: Record<string, number>
    status: null | 'idle' | 'loading' | 'failed'
    error: string | null
}

const initialState: ProductState = {
    products: {},
    status: null,
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
            const response =  await axios.get('http://localhost:5000/products')
            return response?.data;  
    }
)
    
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchProducts.pending, (state) => { 
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        }
        )  
    },
}) 

export default productSlice.reducer; 