import { CREATE_GROUP, REMOVE_GROUP, RENAME_GROUP } from '../types';

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
      const groupRemove = state.groups.filter(
        ({ id }) => id !== action.payload
      );
      localStorage.setItem('groups', JSON.stringify(groupRemove));
      return {
        ...state,
        groups: groupRemove,
      };
    case RENAME_GROUP:
      const groupRename = state.groups.map((group) => ({
        ...group,
        title:
          group.id === action.payload.id ? action.payload.title : group.title,
      }));
      localStorage.setItem('groups', JSON.stringify(groupRename));
      return {
        ...state,
        groups: groupRename,
      };
    default:
      return state;
  }
};
