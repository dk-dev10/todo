import { combineReducers } from 'redux';
import { groupReducer } from './reducers/groupReducer';
import { todoReducer } from './reducers/todoReducer';

export const rootReducer = combineReducers({
  groups: groupReducer,
  todos: todoReducer,
});
