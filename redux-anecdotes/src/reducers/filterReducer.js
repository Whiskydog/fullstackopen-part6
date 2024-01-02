const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filter/filterChanged':
      return action.payload;
    default:
      return state;
  }
};

export const filterChanged = (filter) => {
  return {
    type: 'filter/filterChanged',
    payload: filter,
  };
};

export default reducer;
