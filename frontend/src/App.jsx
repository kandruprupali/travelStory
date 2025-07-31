import React from 'react'     //rafce shortcut for boiler plate code 
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
