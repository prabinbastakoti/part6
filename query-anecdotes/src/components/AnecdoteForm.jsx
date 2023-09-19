import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNotificationDispatch } from '../notificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: async (newAnecdote) => {
      if (newAnecdote.content.length < 5) {
        throw new Error('too short anecdote, must have length 5 or more');
      }

      const response = await axios.post(
        'http://localhost:3001/anecdotes',
        newAnecdote
      );
      return response.data;
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] });
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] },
        anecdotes.concat(newAnecdote)
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote');
    const id = Number(Math.random() * 100000).toFixed(0);
    const newAnecdote = { content, id, votes: 0 };
    newAnecdoteMutation.mutate(newAnecdote, {
      onSuccess: () => {
        dispatch({ type: 'CREATE', payload: content });
        setTimeout(() => {
          dispatch({ type: 'CLEAR' });
        }, 5000);
      },
      onError: (error) => {
        dispatch({ type: 'ERROR', payload: error.message });
        setTimeout(() => {
          dispatch({ type: 'CLEAR' });
        }, 5000);
      },
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
