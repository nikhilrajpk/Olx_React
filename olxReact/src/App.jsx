import React, { Suspense, useEffect, useState } from 'react'
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
  const [user, setUser] = useState(()=>{
    const loggedUser = localStorage.getItem('loggedUser')
    return loggedUser ? JSON.parse(loggedUser) : {
        username : '',
        email : '',
        phone : '',
        address : '',
        id : '',
    }
  }
  )

  const [isLogged, setIsLogged] = useState(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    return loggedUser ? true : false;
  });

  console.log(user)

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('loggedUser');
    }
  }, [isLogged, user]);

  const handleUser = (userDetails) => {
    const { username, email, phone, address, id } = userDetails;
    setUser({ username, email, phone, address, id });
    setIsLogged(true);
  };
  

  const handleIsLogged = ()=>{
    setUser({
      username: '',
      email: '',
      phone: '',
      address: '',
    });
    setIsLogged(false);
    localStorage.removeItem('loggedUser');
    alert('Successfully logged out');
  }

  // productContext
  const [products, setProducts] = useState(()=>{
    const saved_products = localStorage.getItem('all_products')
    return saved_products ? JSON.parse(saved_products) : []
  });

  const handleProducts = (data)=>{
    setProducts(data)
  };

  // storing all products in the localstorage
  useEffect(()=>{
    localStorage.setItem('all_products', JSON.stringify(products))
  },[products])

  const [singleProduct, setSingleProduct] = useState(()=>{
    const single_product = localStorage.getItem('single_product')
    return single_product ? JSON.parse(single_product) : ''
  })
  
  const handleSingleProduct = (prod)=>{
    setSingleProduct(prod)
  }

  // filterd products
  // const [filteredProducts, setFilteredProducts] = useState(products)

  // const handleFilteredProducts = (filter_products)=>{
  //   setFilteredProducts(filter_products)
  // }

  // search term
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTerm = (searchText)=>{
    setSearchTerm(searchText)
  }

  return (
    < UserProvider value={{user, isLogged, handleUser, handleIsLogged}} >
      < ProductProvider value={{products, handleProducts, singleProduct, handleSingleProduct, searchTerm, handleSearchTerm }} >
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
