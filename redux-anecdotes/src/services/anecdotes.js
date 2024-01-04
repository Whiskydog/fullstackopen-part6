import axios from 'axios';

export const fetchAnecdotes = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const data = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post('/api/anecdotes', data);
  return response.data;
};
