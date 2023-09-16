import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdote(state, action) {
      const query = action.payload;
      return query;
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;

export default filterSlice.reducer;
