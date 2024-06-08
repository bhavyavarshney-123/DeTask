import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-toastify'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { loadTodos } from "../slices/todoSlice"


const SignInScreen = () => {
	const [Uname, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [cid, setCid] = useState('')
	
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [login, { isLoading }] = useLoginMutation()

	const { userInfo } = useSelector((state) => state.auth)

	// useEffect(() => {
	// 	if (userInfo) {
	// 		navigate('/')
	// 	}
	// }, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			const res =  await  fetch('http://localhost:1001/authenticate',{
				method:"POST",
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				  },
				body:JSON.stringify({
					username:Uname,
					password:password,
					cid:cid
				})
			})
			const result = await res.json()
			//dispatch(setCredentials({...res}))
			console.log(result.authenticated)
			dispatch(setCredentials({cid:cid,userInfo:result.user}))
			dispatch(loadTodos(result.user.tasks.tasksmap))
			navigate('/todo')
		} catch (err) {
			console.log(err)
			toast.error(err?.data?.message || err.error)
		}
	}


  return (
	<div className="dflex">
		<Header />
		<div class="middle" >
			<div className="lp-form-container">
				<h1 className="lp-form-title">Sign In</h1>
				<form className="lp-form" onSubmit={ submitHandler }>
			
					<div className="form-row">
						<label>User name</label>
						<input
							className="lp-input"
							type="text"
							placeholder="Enter User name..."
							value={Uname}
							onChange={(e) => setUsername(e.target.value)}
						>
						</input>
					</div>
					<div className="form-row">
						<label>Password</label>
						<input
							className="lp-input"
							type="password"
							placeholder="Enter Password..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						>
						</input>
					</div>
					<div className="form-row">
						<label>CID</label>
						<input
							className="lp-input"
							type="text"
							placeholder="Enter CID..."
							value={cid}
							onChange={(e) => setCid(e.target.value)}
						>
						</input>
					</div>
					{ isLoading && <p>Loading...</p>}
					<button className="lp-form-btn" type="submit">Sign In</button>
					<div className="form-row">
						<p className="lp-form-bttm">New Customer? <Link className="link" to='/signup'>Sign Up</Link></p>
					</div>
				</form>
			</div>
		</div>
		<Footer />
	</div>

  )
}

export default SignInScreen