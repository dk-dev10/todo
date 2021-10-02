import { MENU_TOGGLE } from '../types';

const initialState = false;

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return action.payload;

    default:
      return state;
  }
};
