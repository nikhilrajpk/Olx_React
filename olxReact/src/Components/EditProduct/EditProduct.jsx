import React from 'react'
import Arrow from '../Arrow/Arrow'
import './EditProduct.css'

function EditProduct() {
  return (
    <div className='edit_page'>
      <Arrow />
        <div className="edit_div">
            <div className="edit_logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWvz4SoS1_MDfmm-HevR3Wgx2er-ZQNaKm_aGkYHdOgkLKJQXj2j0BlV4&s"
                alt="olx logo" className="edit_img" />
            </div>
            <form className='edit_form'>
                <input type="text" placeholder='Product Name' className="edit_field" required />
                <input type="text" placeholder='Price' className="edit_field" required />
                <input type="text" placeholder='Category' className="edit_field" required />
                <input type="text" placeholder='Description' className="edit_field" required />
                <input type="file" placeholder='Image' accept='.png, .jpg, .jpeg' className="edit_upload_img" required />
                <button className='edit_button'>Edit</button>
            </form>
        </div>
    </div>
  )
}

export default EditProduct