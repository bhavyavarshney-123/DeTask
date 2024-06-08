import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useRegisterMutation } from "../slices/usersApiSlice"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { v4 as uuidv4 } from 'uuid';
const SignUpScreen = () => {
  const [UName, setUserName] = useState('')
  const [Cid, setCid] = useState()
  
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [register, { isLoading }] = useRegisterMutation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const copyToClipboard = () => {
        const text = document.getElementById("textToCopy").value;

        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Copied the text: " + text);
            })
            .catch(err => {
                console.error("Failed to copy text: ", err);
            });
    };

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			console.log('Passwords do not match')
			toast.error('Passwords do not match')
		} else {
			try {
				// const res = await register({ UName, password}).unwrap()
				// dispatch(setCredentials({...res}))
			const res = await  fetch('http://localhost:1001/register',{
					method:"POST",
					headers: {
						'Content-Type': 'application/json'
						// 'Content-Type': 'application/x-www-form-urlencoded',
					  },
					body:JSON.stringify({
						username:UName,
						password:password
					})
				})
				console.log(res)
				const result = await res.json()
                console.log(result)
				setCid(result.cid)		
				// 'new Promise((res,rej)=>{
				// 	setTimeout(()=>{
                //       setCid(true)					
				// 	},3000)
				// })
				//navigate('/')
			} catch (err) {
				console.log(err)
				//toast.error(err?.data?.message || err.error)
			}
		}
	}


  return (
		<div className="dflex">
			<Header />
			<div class="middle" >
				<div className="lp-form-container">
					<h1 className="lp-form-title">Sign Up</h1>
					<form className="lp-form" onSubmit={ submitHandler }>
												
						<div className="form-row">
							<label>User Name</label>
							<input
								className="lp-input"
								type="text"
								placeholder="Enter User name..."
								value={UName}
								onChange={(e) => setUserName(e.target.value)}
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
							<label>Confirm Password</label>
							<input
								className="lp-input"
								type="password"
								placeholder="Confirm Password..."
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							>
							</input>
						</div>
						{ isLoading && <p>Loading...</p>}
						<button className="lp-form-btn" type="submit">Sign Up</button>
						<div className="form-row">
							<p className="lp-form-bttm">Already have an account? <Link to='/signin' className="link">Sign In</Link></p>
						</div>
						</form>
						{Cid && <><p>Your CID is </p>
						<div className="copyContainer">
						<input type="text" id="textToCopy" value={Cid} readOnly/>
                      <button onClick={copyToClipboard} id="copyButton" title="Copy to Clipboard">
                        <i className="fas fa-copy"></i>
                           </button>
						   </div>
						<p>You can Sign In Now</p></>}
				
				</div>
			</div>
            <Footer />
		</div>
  )
}

export default SignUpScreen