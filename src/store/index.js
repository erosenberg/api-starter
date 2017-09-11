import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import { AppState } from './initialState';

export const configureStore = () => {
  const logger = createLogger({ collapsed: true });
  const middlewares = [
    thunk,
    logger
  ];

  const store = createStore(
    reducer,
    AppState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
