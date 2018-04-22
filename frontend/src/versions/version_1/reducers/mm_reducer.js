import {SET_SEARCH, FETCH_TITLES, SET_VERSION} from '../actions/action_types';

const defaultState = {
  search: "",
  titles: [],
  version: 0,
}

export default function mmReducer(state = defaultState, action) {
  let newState;
  switch (action.type) {
    case SET_SEARCH:
      newState = Object.assign({}, state, { search: action.search });
      return newState;
    case FETCH_TITLES:
      newState = Object.assign({}, state, { titles: action.titles });
      return newState;
    case SET_VERSION:
      newState = Object.assign({}, state, { version: action.version });
      return newState;
    default:
      return state;
  }
}
