import axios from 'axios';

export const getAnecdotes = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const response = await axios.post('/api/anecdotes', anecdote);
  return response.data;
};
