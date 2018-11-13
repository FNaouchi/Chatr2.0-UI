import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return dispatch => {
    instance
      .get("channels/")
      .then(res => res.data)
      .then(channels =>
        dispatch({ type: actionTypes.FETCH_CHANNELS, payload: channels })
      )
      .catch(error => console.error(error));
  };
};

export const fetchChannel = channelId => {
  return dispatch => {
    instance
      .get(`channels/${channelId}/`)
      .then(res => res.data)
      .then(channel =>
        dispatch({ type: actionTypes.FETCH_CHANNEL, payload: channel })
      )
      .catch(error => console.error(error));
  };
};

export const postChannel = newChannel => {
  return dispatch => {
    instance
      .post("channels/create/", newChannel)
      .then(res => res.data)
      .then(createdChannel =>
        dispatch({
          type: actionTypes.POST_CHANNEL,
          payload: createdChannel
        })
      )
      .catch(error => console.error(error.response.data));
  };
};

export const postMessage = (channelId, newMessage) => {
  return dispatch => {
    instance
      .post(`channels/${channelId}/send/`, newMessage)
      .then(res => res.data)
      .then(() =>
        dispatch({
          type: actionTypes.POST_MESSAGE,
          payload: newMessage
        })
      )
      .catch(error => console.error(error.response.data));
  };
};
