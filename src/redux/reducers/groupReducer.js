import { CREATE_GROUP, REMOVE_GROUP } from '../types';

const storage = localStorage['groups']
  ? JSON.parse(localStorage.getItem('groups'))
  : [];

const initialState = {
  groups: storage,
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      const groups = [...state.groups, action.payload];
      localStorage.setItem('groups', JSON.stringify(groups));
      return {
        ...state,
        groups,
      };
    case REMOVE_GROUP:
      const groupsRemove = state.groups.filter(
        ({ id }) => id !== action.payload
      );
      localStorage.setItem('groups', JSON.stringify(groupsRemove));
      return {
        ...state,
        groups: groupsRemove,
      };
    default:
      return state;
  }
};
