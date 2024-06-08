import { Link } from "react-router-dom"
import image from '../assets/Task_img.jpeg'

const Hero = () => {
  return (
    <div className="section">
      <div className="hero">
        <div className="hero-left">
          <h1 className="hero-title">TASK MANAGEMENT</h1>
          <div className="hero-sub">Finally, a to-do list that doesn't answer to anyone but you</div>
          <div className="hero-sub2">
          Ditch the middleman and take control of your productivity! This system stores tasks securely on IPFS using CIDs for ownership.
           Manage tasks with ease in a user-friendly interface, all powered by the efficiency of Go. 
           Decentralized. Secure. Simple.
          </div>
          <Link to='/signup'><button className="cta-btn">Get Started</button></Link>
        </div>
        <div className="hero-right">
          <img src={image} className="hero-img"></img>
        </div>
      </div>
    </div>
  )
}

export default Hero