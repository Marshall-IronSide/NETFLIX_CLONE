import React from 'react'
import HeroBg from '../assets/herobg2.jpg'

const Hero = () => {
  return (
    <div>
      <img src={HeroBg} alt="" />
      <div>
        <button>Save for Later</button>
        <button>Watch Now</button>
      </div>
    </div>
  )
}

export default Hero
