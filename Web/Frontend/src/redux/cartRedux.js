import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cartQuantity: 0,
        total: 0,
    },
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
            state.cartQuantity += 1;
            state.total += action.payload.price * action.payload.productQuantity;
        },
        changeQuantity(state, action) {
            let index = action.payload.index;
            let unit = action.payload.unit;
            if (state.products[index].productQuantity + unit > 0) {
                state.products[index].productQuantity += unit
                state.total += unit * state.products[index].price
            }
        },
        removeProduct(state, action) {
            let index = action.payload.index;
            state.total -= state.products[index].price * state.products[index].productQuantity
            state.products.splice(index, 1);
            state.cartQuantity -= 1;
        }
    }
})

export const { addProduct, changeQuantity, removeProduct } = cartSlice.actions
export default cartSlice.reducer