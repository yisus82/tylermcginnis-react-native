import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';

/**
 * Entries reducer
 * @param {{ type: string; entries: object[]; entry: object; }} action
 */
const entriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries,
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry,
      };
    default:
      return state;
  }
};

export default entriesReducer;
