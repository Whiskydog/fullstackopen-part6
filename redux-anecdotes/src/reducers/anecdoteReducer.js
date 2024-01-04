import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
      state.push(asObject(action.payload));
    },
    anecdotesLoaded(state, action) {
      return action.payload;
    },
  },
});

export const { anecdoteVoted, anecdoteAdded, anecdotesLoaded } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
