import react from "react";
import {  useState } from "react";
import { BrowserRouter as Router, Routes,Route,Navigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx'
import SignInScreen from './screens/SignInScreen.jsx'
import SignUpScreen from './screens/SignUpScreen.jsx'
import Todo from './screens/Todo.jsx'

function App() {
  const [loggedIn, setLoggedIn ] = useState(true)
  const { userInfo } = useSelector((state) => state.auth)
  const toggleRoute = () =>{
    setLoggedIn(!loggedIn)
  }
  return (
 
    <Router>
      <Routes>
    <Route path='/' element={userInfo?<Navigate replace to={"/todo"}/> :<HomeScreen />} /> 
    <Route path='/todo' element={<Todo/>}/>
    <Route path='/signin' element={<SignInScreen />} />
   <Route path='/signup' element={<SignUpScreen />} /> 
   </Routes>
    </Router>

  );
}
export default App;