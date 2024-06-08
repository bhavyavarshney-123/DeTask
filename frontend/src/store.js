import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import todoReducer from './slices/todoSlice';
import activeProjectReducer from './slices/activeProjectSlice'
import { apiSlice } from './slices/apiSlice'


// const loadState = async() => {
//   try {
//     const serializedState = localStorage.getItem('todos');
//     console.log(serializedState)
//     const arr = serializedState ? JSON.parse(serializedState) : [];
//     console.log(arr)
//     return arr
//   } catch (err) {
//     return undefined;
//   }
// };

// const preloadedState = loadState();

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};



const store = configureStore({
  reducer: {
      auth: authReducer,
      activeProject: activeProjectReducer,
      todos:todoReducer,
			[apiSlice.reducerPath]: apiSlice.reducer,
  },
  // preloadedState:{
  //   todos:{todos:preloadedState}
  // },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})


// store.subscribe(() => {
//   console.log( store.getState().todos.todos)
//   saveState({
//     todos: store.getState().todos.todos,
//   });
// });
export default store