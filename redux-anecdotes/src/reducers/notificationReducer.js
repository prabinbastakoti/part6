import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const { showNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notification, seconds) => {
  console.log(seconds);
  return async (dispatch) => {
    const milliseconds = seconds * 1000;
    dispatch(showNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, milliseconds);
  };
};

export default notificationSlice.reducer;
