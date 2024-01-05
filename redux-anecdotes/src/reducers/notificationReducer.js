import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    visible: false,
  },
  reducers: {
    notificationSet(state, action) {
      state.content = action.payload;
      state.visible = true;
    },
    notificationRemoved(state) {
      state.content = '';
      state.visible = false;
    },
  },
});

let timeoutId;
export const setNotification = (message, seconds) => (dispatch) => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => dispatch(notificationRemoved()), seconds * 1000);
  dispatch(notificationSet(message));
};

export const { notificationSet, notificationRemoved } =
  notificationSlice.actions;
export default notificationSlice.reducer;
