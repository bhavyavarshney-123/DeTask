import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addTodo } from '../slices/todoSlice';
import { updateCid} from '../slices/authSlice';
import { v4 as uuidv4 } from 'uuid';
import './Todocss.css'
const AddTodo = () => {
  const [taskText, setTasktext] = useState('');
  const [descText, setDesctext] = useState('');
  const dispatch = useDispatch();
  const cid = useSelector((state) => state.auth.cid);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (taskText.trim()) {
      try {
        const res =  await  fetch('http://localhost:1001/tasks',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
            'X-CID':cid
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          body:JSON.stringify({
            id: 3,
            title:taskText,
            description:descText,
            status: false,
          })
        })
        const result = await res.json()
        //dispatch(setCredentials({...res}))
        console.log(result.id)
        dispatch(addTodo({
          id: result.id,
          title:taskText,
          description:descText,
          status: false,
        }));
        console.log(result.cid)
        dispatch(updateCid(result.cid))
      
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error)
      }
 
      setTasktext('');
      setDesctext('');
    }
  };

  return (
   
    <form onSubmit={handleSubmit}>
      
       <input
        id = "task"
        type="text"
        value={taskText}
        placeholder="task"
        onChange={(e) => setTasktext(e.target.value)}
      />
      
      <input
        id = "description"
        type="text"
        value={descText}
        placeholder="description"
        onChange={(e) => setDesctext(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>

  );
};

export default AddTodo;