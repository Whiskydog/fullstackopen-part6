import { useSelector, useDispatch } from 'react-redux';
import { anecdoteVoted } from '../reducers/anecdoteReducer';
import { showNotification } from '../notification';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(anecdoteVoted(anecdote.id));
    showNotification(`you voted '${anecdote.content}'`);
  };

  return (
    <>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
