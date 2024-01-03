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

export const { notificationSet, notificationRemoved } =
  notificationSlice.actions;
export default notificationSlice.reducer;
