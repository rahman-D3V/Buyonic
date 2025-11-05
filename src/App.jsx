import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home'
import Contact from './pages/Contact'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<Contact/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
   </>
  )
}

export default App
