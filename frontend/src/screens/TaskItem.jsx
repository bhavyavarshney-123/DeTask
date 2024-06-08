import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo,EditTodo } from '../slices/todoSlice';
import{updateCid} from '../slices/authSlice'
import "./Todocss.css";
const TaskItem = ({item}) => {
   
    const [edit, setEdit] = useState(false);
    const cid = useSelector((state)=>state.auth.cid)
    const [taskText, setTasktext] = useState(item.title);
    const [descText, setDesctext] = useState(item.description);
    const [taskstatus, setTaskstatus] = useState(item.status);
   
    const dispatch = useDispatch();
    const deleteItem = async(id)=>{
      console.log(id)
      try {
        const res =  await  fetch(`http://localhost:1001/tasks/${id}`,{
          method:"DELETE",
          headers: {
            'Content-Type': 'application/json',
            'X-CID':cid
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const result = await res.json()
        //dispatch(setCredentials({...res}))
        console.log(result)
        dispatch(removeTodo(id));
        console.log(result.cid)
        dispatch(updateCid(result.cid))
      
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error)
      }
    }
    const editItem = async()=>{
      if(item.title === taskText &&  item.description === descText && item.status === taskstatus )
        {
          setEdit(false);
          return
        }
      
      try {
        const res =  await fetch(`http://localhost:1001/tasks/${item.id}`,{
          method:"PUT",
          headers: {
            'Content-Type': 'application/json',
            'X-CID':cid
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          body:JSON.stringify({
              id: parseInt(item.id),
              title:taskText,
              description:descText,
              status: taskstatus
            }),
    
        })
        const result = await res.json()
        //dispatch(setCredentials({...res}))
        console.log(result)
        dispatch(EditTodo({id:item.id,title:taskText,description:descText,status:taskstatus}));
        //console.log(result.cid)
        dispatch(updateCid(result.cid))
         
      setEdit(false);
      } catch (err) {
        console.log(err)
       // toast.error(err?.data?.message || err.error)
      }
  
    }
  return (
    <>
    {(!edit)?(<>
    <span id="taskItem"
    className={ taskstatus ? 'completed' : ''}
    // onClick={() => (edit && dispatch(toggleTodo(item.id)))}
  >
    {taskText} 
  </span>
  <span id="descItem" className={taskstatus? 'completed' : ''} >
    {descText} 
  </span></>):
  (<div className="itemInput">
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
      /></div>)}
  <button onClick={() => deleteItem(item.id)}>Delete</button>
  {!edit?
  (<button onClick={() => {setEdit(true)}}>Edit</button>):
  (<>
  <button onClick={() => editItem()}>Done</button>
<button onClick={() =>{setTaskstatus(!taskstatus)}}>
  {taskstatus?"completed":"uncomplete"}
  </button>
  </>)
  }
</>
  )
}

export default TaskItem