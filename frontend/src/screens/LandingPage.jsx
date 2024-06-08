import './LandingPage.css'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const LandingPage = () => {


  return (
  <div className='dflex'>
    <Header />
		<Hero />
    <Footer />
  </div>
  )
}

export default LandingPage