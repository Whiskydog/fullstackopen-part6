import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotify } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notify = useNotify(5);

  const onMutationSuccess = (anecdote) => {
    queryClient.setQueryData(['anecdotes'], (anecdotes) =>
      anecdotes.concat(anecdote)
    );
    notify(`you've added '${anecdote.content}'`);
  };

  const onMutationError = (error) => {
    notify(error.response.data.error);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: onMutationSuccess,
    onError: onMutationError,
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      {newAnecdoteMutation.isPending ? (
        <div>Adding anecdote...</div>
      ) : (
        <form onSubmit={onCreate}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      )}
    </div>
  );
};

export default AnecdoteForm;
