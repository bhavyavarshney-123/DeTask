import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []

};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos: (state, action) => {
     
     // console.log(state.todos)
      console.log(action.payload)
      const tasks=[]
      Object.keys(action.payload).forEach(key => {
        console.log(`${key}: ${action.payload[key]}`);
        tasks.push(action.payload[key])
    })
    state.todos = tasks
    localStorage.setItem('todos', JSON.stringify(tasks))
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id == action.payload);
      if (todo) {
        console.log('k')
        todo.status = !todo.status;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    EditTodo: (state, action) => {
      console.log(action.payload)
      
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      todo.title=action.payload.title
      todo.description=action.payload.description
      todo.status=action.payload.status
      localStorage.setItem('todos', JSON.stringify(state.todos))
    }
  },
});

export const { loadTodos, addTodo, removeTodo, toggleTodo,EditTodo } = todoSlice.actions;

export default todoSlice.reducer;