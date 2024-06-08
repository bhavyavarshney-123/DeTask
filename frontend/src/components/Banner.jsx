
import { useDispatch, useSelector} from 'react-redux';
const Banner = () => {
  const testcid = useSelector((state)=>state.auth.testcid)
  return (
    <div>
      <div className="banner">
        <span>Reviewing my portfolio?</span>
        <span>Start blank & Create dummy account</span>
        <span>or</span>
        <span>Sign In with email: testUser | password: password1 | cid : {testcid}</span>
      </div>
    </div>
  )
}

export default Banner