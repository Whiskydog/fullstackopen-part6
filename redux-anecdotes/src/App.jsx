import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { fetchAnecdotes } from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { anecdotesLoaded } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAnecdotes = async () => {
      const anecdotes = await fetchAnecdotes();
      dispatch(anecdotesLoaded(anecdotes));
    };

    loadAnecdotes();
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
