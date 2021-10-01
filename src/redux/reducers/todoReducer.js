import { CREATE_TODO, REMOVE_TODO } from '../types';

const storage = localStorage['todos'];

const initialState = {
  todos: [] || JSON.parse(storage),
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      const todos = [...state.groups, action.payload];
      localStorage.setItem('todos', JSON.stringify(todos));
      return {
        ...state,
        todos,
      };
    case REMOVE_TODO:
      const todosRemove = state.groups.filter(
        ({ id }) => id !== action.payload.id
      );
      localStorage.setItem('todos', JSON.stringify(todosRemove));
      return {
        ...state,
        todos: todosRemove,
      };
    default:
      return state;
  }
};
