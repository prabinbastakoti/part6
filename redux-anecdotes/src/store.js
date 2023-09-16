import { configureStore } from '@reduxjs/toolkit';
import Anecdotereducer from './reducers/anecdoteReducer';
import FilterReducer from './reducers/filterReducer';
import NotificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: Anecdotereducer,
    filter: FilterReducer,
    notification: NotificationReducer,
  },
});

export default store;
