import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userData: {},
    isLoading: true
};

export const postUserData = createAsyncThunk(
    'user/postUserData',
    async (data, thunkAPI) => {
        try {

            // const response = await userApi.post(data); // Simulation
            const response = {}
            response.data = data;

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        newUserData: (state, { payload }) => {
            // non Async and short method (not in use)
            state.userData = payload;
        },
    },
    extraReducers: {
        [postUserData.pending]: (state) => {
            state.isLoading = true;
        },
        [postUserData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
        },
        [postUserData.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const { newUserData } = userDataSlice.actions;

export default userDataSlice.reducer;