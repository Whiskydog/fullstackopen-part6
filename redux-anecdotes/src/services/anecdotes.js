import axios from 'axios';

const getAll = async () => {
  const response = await axios.get('/api/anecdotes');
  return response.data;
};

const create = async (anecdote) => {
  const data = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post('/api/anecdotes', data);
  return response.data;
};

const vote = async (anecdote) => {
  const data = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
  };
  const response = await axios.put(`/api/anecdotes/${anecdote.id}`, data);
  return response.data;
};

export default { getAll, create, vote };
