import React from 'react'
import Header from './header/header'
import Footer from './footer/Footer'
const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className=''>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default layout