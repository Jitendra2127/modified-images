// import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import AddCaption from './Pages/AddCaption'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addcaption" element={<AddCaption/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
