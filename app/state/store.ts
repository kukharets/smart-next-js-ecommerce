import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products';

import filterSlice from './filter';
const store = configureStore({
  reducer: {
    products: productSlice,
    filter: filterSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
