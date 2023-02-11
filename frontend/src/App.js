import React from 'react'
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Container maxwidth='lg'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/form' element={<Form/>} />
            <Route exact path='/auth' element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
