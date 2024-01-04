import { createSlice } from '@reduxjs/toolkit';
import { fetchAnecdotes } from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVoted(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload
          ? anecdote
          : {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
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
  const anecdotes = await fetchAnecdotes();
  dispatch(anecdotesLoaded(anecdotes));
};

export const { anecdoteVoted, anecdoteAdded, anecdotesLoaded } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
