import { useSelector, useDispatch } from 'react-redux';
import { anecdoteAdded, anecdoteVoted } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) =>
    state.toSorted((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(anecdoteVoted(id));
  };

  const add = (anecdote) => {
    dispatch(anecdoteAdded(anecdote));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    add(event.target.anecdote.value);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
