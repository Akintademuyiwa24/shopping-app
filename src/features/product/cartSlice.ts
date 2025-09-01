import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

interface CartItem {
    // Define the properties of a cart item, for example:
    id: string;
    title: string;
    price: number;
    quantity: number;
    cartQuantity: number;
}

interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

const initialState: CartState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") || "[]")
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0, 
} 

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exisitingItem = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );  
            if(exisitingItem >=0) {
                state.cartItems[exisitingItem].cartQuantity += 1;
                toast.info(`${action.payload.title} quantity increased`, {
                    position: "bottom-left",
                    autoClose: 2000,
                    theme: "colored"
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left",
                    autoClose: 2000,
                    theme: "colored" 
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            // Update totals
    const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
            const { price, cartQuantity } = cartItem;
            const itemTotal = price * cartQuantity;
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
            return cartTotal;
        },
        { total: 0, quantity: 0 }
    );
    state.cartTotalQuantity = quantity;
    state.cartTotalAmount = total;
        },

        removeFromCart: (state, action) => { 
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error(`${action.payload.title} removed from cart`, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            });

            // Update totals
            const { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                { total: 0, quantity: 0 }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
            toast.info("Cart cleared", {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            });
        },
        incrementCartQuantity: (state, action) => {
            const exisitingItem = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(exisitingItem >= 0) {
                state.cartItems[exisitingItem].cartQuantity += 1;
                toast.info(`${action.payload.title} quantity increased`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decrementCartQuantity: (state, action) => {    
            const existingItem = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(existingItem >= 0 && state.cartItems[existingItem].cartQuantity > 1) {
                state.cartItems[existingItem].cartQuantity -= 1;
                toast.info(`${action.payload.title} quantity decreased`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            } else if (existingItem >= 0 && state.cartItems[existingItem].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.title} removed from cart`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotal: (state) => {
            const { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
}); 

export const { addToCart, removeFromCart, incrementCartQuantity, decrementCartQuantity, clearCart, getTotal } = cartSlice.actions;
export default cartSlice.reducer;