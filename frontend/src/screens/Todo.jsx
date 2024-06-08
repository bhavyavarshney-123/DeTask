import { Outlet, redirect } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
//import { loadTodos } from '../slices/todoSlice';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { useEffect } from "react";
import "./Todocss.css"

import { logout } from "../slices/authSlice.js";
const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cid = useSelector((state)=>state.auth.cid)
  console.log(userInfo)
  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem('todos')) || [];
  //   //dispatch(loadTodos(todos));
  // }, [dispatch]);
  return (
     !userInfo ? <SignInScreen/> :(
    <div className="container">
      <div className="logout">
        <button onClick={ ()=>{alert(`Your Updated CID is ${cid}`) ;dispatch(logout()); navigate('/')}}>LOGOUT</button>
      </div>
      <div id="todo">
      <h1>Task List</h1>
      <AddTodo />
      <TodoList />
      </div>
    </div>)
  )
}

export default Todo
