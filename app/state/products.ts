import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  creationAt: string;
  updatedAt: string;
  category: string;
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
    .get<
      IProduct[]
    >(`http://localhost:4000/products?page=1&limit=10&price_min=${1}&price_max=${1000}`)
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
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export default productSlice.reducer;
