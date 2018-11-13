import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  channelText: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case actionTypes.FETCH_CHANNEL:
      return {
        ...state,
        channelText: action.payload
      };
    case actionTypes.POST_MESSAGE:
      return {
        ...state,
        channelText: state.channelText.concat(action.payload)
      };
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
