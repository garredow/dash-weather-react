export default (state, action) => {
  switch (action.type) {
    case 'SET_FORECAST':
      return { ...state, forecast: action.forecast };
    case 'SET_LOCATION':
      return { ...state, location: action.location };
    default:
      return state;
  }
};
