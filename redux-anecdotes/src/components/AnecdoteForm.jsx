import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../notification';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (anecdote) => {
    dispatch(addAnecdote(anecdote));
    showNotification(`you added '${anecdote}'`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    add(event.target.anecdote.value);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
