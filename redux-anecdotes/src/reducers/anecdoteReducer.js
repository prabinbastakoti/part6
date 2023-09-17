import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    updatedAnecdotes(state, action) {
      const newAnecdote = action.payload;
      const id = newAnecdote.id;
      return state.map((anecdote) =>
        anecdote.id === id ? newAnecdote : anecdote
      );
    },
  },
});

export const { setAnecdotes, appendAnecdotes, updatedAnecdotes } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getALL();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content, getId());
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const updateVotes = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState().anecdotes.find((n) => n.id === id);
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };
    const response = await anecdoteService.update(id, updatedAnecdote);
    dispatch(updatedAnecdotes(response));
  };
};

export default anecdotesSlice.reducer;
