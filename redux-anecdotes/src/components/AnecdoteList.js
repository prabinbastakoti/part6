import { useSelector, useDispatch } from 'react-redux';
import { increaseVote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  showNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (id, anecdote) => {
    dispatch(increaseVote(id));
    dispatch(showNotification(`you voted ${anecdote}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes.sort((a, b) => b.votes - a.votes)];

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
