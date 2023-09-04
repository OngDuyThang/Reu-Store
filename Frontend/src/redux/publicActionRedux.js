import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: false
}

const publicActionSlice = createSlice({
    name: 'publicAction',
    initialState,
    reducers: {
        publicActionStart(state) {
            state.isFetching = true;
        },
        publicActionSuccess(state) {
            state.isFetching = false;
            state.error = false;
        },
        publicActionFailure(state) {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { publicActionStart, publicActionSuccess, publicActionFailure } = publicActionSlice.actions;
export default publicActionSlice.reducer;