import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotify } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notify = useNotify(5);

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      );
    },
  });

  const {
    isPending,
    isError,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (isPending) return <span>Loading anecdotes...</span>;

  if (isError) {
    const message = error.response.statusText.toLowerCase();
    return <span>Anecdote service unavailable: {message}.</span>;
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notify(`anecdote '${anecdote.content}' voted`);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
