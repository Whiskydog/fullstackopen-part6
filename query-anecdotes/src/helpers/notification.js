let timeoutId;

export const triggerNotification = (payload, dispatch, seconds) => {
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
