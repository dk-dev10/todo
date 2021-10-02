import { combineReducers } from 'redux';
import { groupReducer } from './reducers/groupReducer';
import { menuReducer } from './reducers/menuReducer';
import { todoReducer } from './reducers/todoReducer';

export const rootReducer = combineReducers({
  groups: groupReducer,
  todos: todoReducer,
  menu: menuReducer,
});
