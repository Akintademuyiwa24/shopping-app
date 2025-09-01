import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'; 

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    desc: string;
};

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com/'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
        }),
    }),
});
export const {useGetAllProductsQuery} = productApi;

export const {reducer: productReducer} = productApi;
