import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const navigate=useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(()=>{
      localStorage.setItem('token',token)
  },[token])

  useEffect(() => {
    navigate('/list')
  }, [])
  

  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer></ToastContainer>
      {token === ""
        ? <Login  setToken={setToken}></Login>
        :
        <>
          <Navbar setToken={setToken}></Navbar>
          <hr />
          <div className='flex w-full'>
            <Sidebar></Sidebar>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token}/>}></Route>
                <Route path='/list' element={<List token={token}/>}></Route>
                <Route path='/orders' element={<Orders token={token}/>}></Route>
              </Routes>
            </div>
          </div>
        </>
      }


    </div>
  )
}

export default App