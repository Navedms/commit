import { configureStore } from '@reduxjs/toolkit';

import userDataReducer from './userData/userDataSlice';

export const store = configureStore({
    reducer: {
        user: userDataReducer
    },
});
