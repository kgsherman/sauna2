import React from 'react';
import App from './components/app';
import reduction from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}


let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore);
let store = createStoreWithMiddleware(reduction);

React.render(
	<Provider store={store}>
		{() => <App />}
	</Provider>,
	document.body
);