import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home'
import Contact from './pages/Contact'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Cart from './pages/shoppingCart'
import Iphone from './pages/shoppingPages/iphone'
import GamingLaptop from './pages/shoppingPages/gamingLaptop'
import SmartWatch from './pages/shoppingPages/smartWatch'
import Monitor from './pages/shoppingPages/monitor'
import PowerBank from './pages/shoppingPages/powerBank'
import EyeGlasses from './pages/shoppingPages/eyeGlasses'
import WinterCollection from './pages/shoppingPages/winterCollection'
import { ColourfulTextDemo } from './pages/shoppingPages/TestPage'
import SignIn from './pages/Sign-in'
import ItemNotFound from './pages/itemNotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/iphone' element={<Iphone/>}/>
    <Route path='/gamingLaptop' element={<GamingLaptop/>}/>
    <Route path='/smartwatch' element={<SmartWatch/>}/>
    <Route path='/monitor' element={<Monitor/>}/>
    <Route path='/powerbank' element={<PowerBank/>}/>
    <Route path='/eyeglasses' element={<EyeGlasses/>}/>
    <Route path='/wintercollection' element={<WinterCollection/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/item-not-found' element={<ItemNotFound/>}/>
   </Routes>
   {/* <Footer/> */}
   </BrowserRouter>
   </>
  )
}

export default App
