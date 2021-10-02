import { CREATE_TODO, EDIT_TODO, REMOVE_TODO } from '../types';

const storage = !!localStorage['todos']
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

const initialState = {
  todos: storage,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      const todos = [...state.todos, action.payload];
      localStorage.setItem('todos', JSON.stringify(todos));
      return {
        ...state,
        todos,
      };
    case REMOVE_TODO:
      const todosRemove = state.todos.filter(
        ({ id }) => id !== action.payload.id
      );
      localStorage.setItem('todos', JSON.stringify(todosRemove));
      return {
        ...state,
        todos: todosRemove,
      };
    case EDIT_TODO:
      const editTodo = state.todos.map((todo) => ({
        ...todo,
        title:
          todo.id === action.payload.id ? action.payload.title : todo.title,
        id: todo.id === action.payload.id ? action.payload.id : todo.id,
        done: todo.id === action.payload.id ? action.payload.done : todo.done,
      }));
      localStorage.setItem('todos', JSON.stringify(editTodo));
      return {
        ...state,
        todos: editTodo,
      };
    default:
      return state;
  }
};
