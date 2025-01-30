import React from 'react'
import LogoImage from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <div className='bg-white rounded-md'>
      <img src={LogoImage} alt='Logo' width={width}/>
    </div>
  )
}

export default Logo