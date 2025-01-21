import React, { Suspense, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserProvider } from './Contexts/UserContext'
const Home = React.lazy(()=>import('./Pages/Home'))
const Login = React.lazy(()=>import('./Pages/Login'))
const SignUp = React.lazy(()=>import('./Pages/SignUp'))
const ProductDetail = React.lazy(()=>import('./Pages/ProductDetail'))
const Sell = React.lazy(()=>import('./Pages/Sell'))
const UserProfile = React.lazy(()=>import('./Pages/UserProfile'))
const EditPrdct = React.lazy(()=>import('./Pages/EditPrdct'))
import Loader from './utils/Loader/Loader'

function App() {
  const [user, setUser] = useState({
    username : '',
    email : '',
    password : '',
    phone : '',
  })
  const [isLogged, setIsLogged] = useState(false)
  const handleUser = (e)=>{
    const {name, value} = e.target
    setUser({
      ...user, [name] : value
    })
    setIsLogged(true)
  }

  return (
    < UserProvider value={user, isLogged, handleUser} >
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
            < Route path='*' element={<div>No page found in this path :( </div>} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  )
}

export default App
