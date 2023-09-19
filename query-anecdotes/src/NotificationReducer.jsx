import { useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state;
    case 'VOTE':
      return state;
    default:
      return state;
  }
};
