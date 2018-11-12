import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { checkForExpiredToken } from "./store/actions/authentication";
// Components
import App from "./App";

// Reducers
import authReducer from "./store/reducers/authentication";
import chanReducer from "./store/reducers/channels";
import errorReducer from "./store/reducers/errors";

const rootReducer = combineReducers({
  rootAuth: authReducer,
  rootChan: chanReducer,
  rootError: errorReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch(checkForExpiredToken());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
