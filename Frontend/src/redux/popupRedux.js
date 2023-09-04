import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showPopup: 0
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        closePopup(state) {
            state.showPopup = 0;
        },
        displayPopup(state) {
            state.showPopup = 1;
        }
    }
})

export const { closePopup, displayPopup } = popupSlice.actions;
export default popupSlice.reducer;