import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVoted(state, action) {
      const newAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
      );
    },
    anecdoteAdded(state, action) {
      state.push(action.payload);
    },
    anecdotesLoaded(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(anecdotesLoaded(anecdotes));
};

export const addAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdotesService.create(content);
  dispatch(anecdoteAdded(anecdote));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdotesService.vote(anecdote);
  dispatch(anecdoteVoted(newAnecdote));
};

export const { anecdoteVoted, anecdoteAdded, anecdotesLoaded } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
