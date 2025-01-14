import React from 'react'
import LogoImage from '../assets/logo.bmp'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={LogoImage} alt='Logo' width={width}/>
    </div>
  )
}

export default Logo