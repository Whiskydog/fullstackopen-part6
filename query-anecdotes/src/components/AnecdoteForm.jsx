import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';
import { triggerNotification } from '../helpers/notification';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const onMutationSuccess = (anecdote) => {
    queryClient.setQueryData(['anecdotes'], (anecdotes) =>
      anecdotes.concat(anecdote)
    );
    triggerNotification(`you've added '${anecdote.content}'`, dispatch, 5);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: onMutationSuccess,
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
