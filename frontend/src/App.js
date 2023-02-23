import React from 'react'
import { Container } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profileData'))
  return (
    <>
      <BrowserRouter>
        <Container maxwidth='lg'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Navigate replace to='/posts' />} />
            <Route exact path='/posts' element={<Home />} />
            <Route exact path='/posts/search' element={<Home />} />
            <Route exact path='/posts/:id' element={<PostDetails />} />
            <Route exact path='/form' element={<Form />} />
            <Route exact path='/auth' element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
