import { useDispatch } from 'react-redux';
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const query = event.target.value;
    dispatch(filterAnecdote(query));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
