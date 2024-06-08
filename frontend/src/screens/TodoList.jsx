import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo,EditTodo } from '../slices/todoSlice';
import './Todocss.css'
import TaskItem from './TaskItem';
const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
 // const loading = useSelector((state) => state.todos.loading);
 
 console.log(todos)
  return (
   
    <ul>
      { todos.map((todo) => (
        <li className="list" key={todo.id}>
         <TaskItem item={todo}/>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;