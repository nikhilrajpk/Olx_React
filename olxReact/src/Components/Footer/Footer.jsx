import React from 'react'
import footer from '../../assets/footer.png'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
        <img src={footer} alt="footer" className='img_footer'/>
    </div>
  )
}

export default Footer