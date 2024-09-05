import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login/login"
import Signup from "./components/signup/signup"
import Home from "./pages/Home"
import RefreshHandler from "./utils/refesh-handler"
import Navbar from "./components/navbar/navbar"
import UserProfile from "./pages/user-profile"


function App() {
  
  return (
   <>
    <BrowserRouter>
    <Navbar/>
    <RefreshHandler/>
    <Routes>

      <Route element={<Login/>} path="/login"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<Home/>} path="/"/>
      <Route element={<UserProfile/>} path="/user-profile/:id"/>
       
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
