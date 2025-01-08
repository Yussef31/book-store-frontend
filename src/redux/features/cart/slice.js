import { createSlice } from '@reduxjs/toolkit'
import Swal from "sweetalert2"

const initialState = {
    cartItems : []
}
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{
        AddToCart:(state,action) => {
            const existingItem = state.cartItems.find(item=>item._id===action.payload._id)
            if(!existingItem) {
                state.cartItems.push(action.payload)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Item added succesfully to the cart"
                  });
            } else (
                Swal.fire({
                    title: "already added to the cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok"
                  })
            )
        },
        /*clear carte */
        removeFromCart : (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart:(state) =>{
            state.cartItems=[]
        }

    }
})
export const {AddToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;