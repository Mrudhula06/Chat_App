import { useEffect, useState } from 'react'
import './App.css'
import './index.css'; // or './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore';
function App() {
  // const [count, setCount] = useState(0)
  const {authUser,checkAuth, isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme}=useThemeStore()
  console.log({onlineUsers});
  useEffect(() =>{
    checkAuth()
  },[checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser)
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
  );
  return (
    <div data-theme={theme} >
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to ="/login" />} />

       
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
