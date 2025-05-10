import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type GlobalSliceState = {
  limit: number;
  currentPage: number;
};

const initialState: GlobalSliceState = {
  limit: 30,
  currentPage: 1,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: (create) => ({
    setLimit: create.reducer((state, action: PayloadAction<number>) => {
      // Redux Toolkit allows "mutating" logic in reducers. It detects
      // changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.limit = action.payload;
    }),
    setCurrentPage: create.reducer((state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }),
  }),
  selectors: {
    selectLimit: (global) => global.limit,
    selectCurrentPage: (global) => global.currentPage,
  },
});

export const { setLimit, setCurrentPage } = globalSlice.actions;
export const { selectLimit, selectCurrentPage } = globalSlice.selectors;
