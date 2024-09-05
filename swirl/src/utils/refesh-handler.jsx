import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = () => {
    let navigate = useNavigate()
    let {pathname} = useLocation()
    let token = localStorage.getItem("token")
    useEffect(()=>{
        if (token) {
            if (pathname === "/login" || pathname === "/signup") {
                navigate("/");
            }
        } else {
            if (pathname !== "/login" && pathname !== "/signup") {
                navigate("/login");
            }
        }
    },[token,navigate,pathname])
  return (
    null
  )
}

export default RefreshHandler
