import {SET_SEARCH, FETCH_TITLES, SET_VERSION, SET_FILTERS} from '../actions/action_types';

const defaultState = {
  search: "",
  titles: [],
  version: 0,
  filters: {
    category: -1,
    gender1: 0,
    gender2: 10,
    ethnicity1: 0,
    ethnicity2: 10,
    bechdel: -1,
  },
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
    case SET_FILTERS:
      newState =  Object.assign({}, state, {});
      newState.filters = Object.assign({}, newState.filters, action.data);
      return newState;
    default:
      return state;
  }
}
