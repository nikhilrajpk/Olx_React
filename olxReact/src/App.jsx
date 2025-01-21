import React, { Suspense, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserProvider } from './Contexts/UserContext'
import { ProductProvider } from './Contexts/ProductContext'
const Home = React.lazy(()=>import('./Pages/Home'))
const Login = React.lazy(()=>import('./Pages/Login'))
const SignUp = React.lazy(()=>import('./Pages/SignUp'))
const ProductDetail = React.lazy(()=>import('./Pages/ProductDetail'))
const Sell = React.lazy(()=>import('./Pages/Sell'))
const UserProfile = React.lazy(()=>import('./Pages/UserProfile'))
const EditPrdct = React.lazy(()=>import('./Pages/EditPrdct'))
import Loader from './utils/Loader/Loader'

function App() {
  // userContext
  const [user, setUser] = useState({
    username : '',
    email : '',
    phone : '',
    address : '',
  })
  const handleUser = (e)=>{
    const {username, email, phone, address} = e
    setUser({
      ...user, username : username, email : email,
      phone : phone, address : address
    })
    setIsLogged(true)
  }
  
  const [isLogged, setIsLogged] = useState(false)
  const handleIsLogged = ()=>{
    setIsLogged(false)
  }

  // productContext
  const [products, setProducts] = useState([]);
  const handleProducts = (data)=>{
    setProducts(data)
  };
  const [singleProduct, setSingleProduct] = useState('')
  const handleSingleProduct = (prod)=>{
    setSingleProduct(prod)
  }

  return (
    < UserProvider value={user, isLogged, handleUser, handleIsLogged} >
      < ProductProvider value={products, handleProducts, singleProduct, handleSingleProduct} >
        <Router >
          < Suspense fallback={ <Loader /> }>
            <Routes>
              < Route exact path='/' element={< Home />} />
              < Route path='/login' element={< Login />} />
              < Route path='/signup' element={< SignUp />} />
              < Route path='/product-detail' element={< ProductDetail/>} />
              < Route path='/sell-product' element={< Sell /> } />
              < Route path='/user-profile' element={< UserProfile /> } />
              < Route path='/edit-product' element={< EditPrdct /> } />
              < Route path='*' element={<h1>No page found in this path :( </h1>} />
            </Routes>
          </Suspense>
        </Router>
      </ProductProvider>
    </UserProvider>
  )
}

export default App
