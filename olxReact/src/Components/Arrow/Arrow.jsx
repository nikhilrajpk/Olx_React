import React from 'react'
import './Arrow.css'
import { useNavigate } from 'react-router-dom'
function Arrow() {
    const navigate = useNavigate()
  return (
    <div className='left_arrow_div'>
            <button onClick={()=>navigate(-1)}
            className='left_arrow'>
                <span>&#8592;</span>
            </button>
    </div>
  )
}

export default Arrow