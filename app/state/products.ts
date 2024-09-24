import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
  };
}

interface IProductSliceState {
  data: IProduct[];
  error: string;
  isLoading: boolean;
}

const initialState: IProductSliceState = {
  data: [],
  error: '',
  isLoading: false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', () =>
  axios
    .get<IProduct[]>('https://api.escuelajs.co/api/v1/products')
    .then(response => response.data)
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || '';
      });
  },
});

export default productSlice.reducer;
