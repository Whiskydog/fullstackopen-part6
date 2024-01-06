import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification/show':
      return {
        content: action.payload,
        visible: true,
      };
    case 'notification/hide':
      return {
        content: '',
        visible: false,
      };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const initialState = {
    content: '',
    visible: false,
  };

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => useContext(NotificationContext)[0];

export const useNotificationDispatch = () => useContext(NotificationContext)[1];

let timeoutId;
export const useNotify = (seconds) => {
  const dispatch = useNotificationDispatch();
  return (payload) => {
    if (timeoutId) clearTimeout(timeoutId);
    dispatch({
      type: 'notification/show',
      payload,
    });
    timeoutId = setTimeout(
      () => dispatch({ type: 'notification/hide' }),
      seconds * 1000
    );
  };
};

export default NotificationContext;
