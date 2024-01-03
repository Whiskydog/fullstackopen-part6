import {
  notificationRemoved,
  notificationSet,
} from './reducers/notificationReducer';
import store from './store';

let timeoutId;

export const showNotification = (content) => {
  if (timeoutId) clearTimeout(timeoutId);
  store.dispatch(notificationSet(content));
  timeoutId = setTimeout(() => store.dispatch(notificationRemoved()), 5000);
};
