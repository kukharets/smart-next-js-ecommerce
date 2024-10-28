import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SORTING_OPTIONS } from '@shared/consts/filter';

interface IFilterSliceState {
  price: {
    min: number;
    max: number;
  };
  sorting: (typeof SORTING_OPTIONS)[keyof typeof SORTING_OPTIONS];
}

const initialState: IFilterSliceState = {
  price: {
    min: 0,
    max: 1000,
  },
  sorting: SORTING_OPTIONS.PRICE_ASC,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<Partial<IFilterSliceState>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export default filterSlice.reducer;

export const { changeFilter } = filterSlice.actions;
