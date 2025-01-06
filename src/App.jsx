import { useEffect, useState } from 'react'
import './App.css'
import './components'
import { Footer, Header } from './components'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(setLoading(false))
  }, [])

  return !loading ? (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) :
  null;
}

export default App
