import { useSelector } from "react-redux"
import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"

const HomeScreen = () => {
 const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
    
        <LandingPage />
    
    </>

  )
}

export default HomeScreen