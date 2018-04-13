import {createStore, applyMiddleware} from 'redux';
import mmReducer from '../reducers/mm_reducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    mmReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}
