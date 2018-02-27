import * as types from '../actions/types';
import initialState from './initialState';

export default function reducer(state = initialState.projects, action) {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return {
        count: action.payload.count,
        next: action.payload.next,
        prev: action.payload.prev,
        results: [...state.results, ...action.payload.results],
      };
    case types.RELOAD_PROJECTS_SUCCESS:
      return {
        count: action.payload.count,
        next: action.payload.next,
        prev: action.payload.prev,
        results: action.payload.results,
      };
    default:
      return state;
  }
}
