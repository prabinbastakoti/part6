import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNotificationDispatch } from './notificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();
  const updateAnecdoteMutation = useMutation({
    mutationFn: async (newAnecdote) => {
      const response = await axios.put(
        `http://localhost:3001/anecdotes/${newAnecdote.id}`,
        newAnecdote
      );
      return response.data;
    },

    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] });
      const newAnecdotes = anecdotes.map((item) =>
        item.id !== anecdote.id ? item : anecdote
      );
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, newAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    console.log('vote');
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(newAnecdote);
    dispatch({ type: 'VOTE', payload: anecdote.content });
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problem in server</div>;
  }

  const anecdotes = result.data;

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
