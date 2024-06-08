import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './App.jsx'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import SignInScreen from './screens/SignInScreen.jsx'
import SignUpScreen from './screens/SignUpScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route path='/' element={<App/>}>
//  <>
//     <Route path='/' element={<HomeScreen />} /> 
//     <Route path='/todo' element={<App/>}/>
//     <Route path='/signin' element={<SignInScreen />} />
//    <Route path='/signup' element={<SignUpScreen />} /> 
//    </>
//   //   {/* <Route path='' element={<PrivateRoute />}>
//   //   <Route path='/profile' element={<ProfileScreen />} />
//   // </Route> */}
 
//   )


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   
       <App/> 
 </Provider>)

  
      /* Private Routes */

    // .render(
    //   // <Provider store={store}>
    //     {/*  */}
    //     <App/>
    //   // </Provider>
    // )