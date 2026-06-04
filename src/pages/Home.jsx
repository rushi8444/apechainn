import React from 'react'
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/HomePage/HeroSection'
import IntroSection from '../components/HomePage/IntroSection'
import AppsSection from '../components/HomePage/AppSection'
import Marquee from '../components/HomePage/Marquee'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    
    
    <div>
      <Navbar />
      <HeroSection/>
      <IntroSection />
      <AppsSection />
      <Marquee/>
      <Footer/>
    </div>
  )
}

export default Home