import axios from 'axios';

export const getAnecdotes = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const response = await axios.post('/api/anecdotes', anecdote);
  return response.data;
};

export const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`/api/anecdotes/${anecdote.id}`, anecdote);
  return response.data;
};
