import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'; 

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
};

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com/'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}`,
        }),
    }),
});
export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi;

export const {reducer: productReducer} = productApi;
