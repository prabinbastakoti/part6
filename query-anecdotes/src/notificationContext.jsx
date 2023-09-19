import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state = 'hello', action) => {
  switch (action.type) {
    case 'CREATE':
      return `new anecdote ${action.payload} added`;
    case 'VOTE':
      return `you voted ${action.payload}`;
    case 'ERROR':
      return action.payload;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
