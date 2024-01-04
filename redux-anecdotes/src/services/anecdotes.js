import axios from 'axios';

export const fetchAnecdotes = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};
