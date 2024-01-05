import axios from 'axios';

export const getAnecdotes = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};
