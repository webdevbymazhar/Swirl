import React, { useEffect, useRef, useState } from 'react'
import {FaBell, FaHome} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth-context';
import { CiLogout, } from "react-icons/ci";


import { CgProfile } from "react-icons/cg";
import ModalComponent from '../modals/logout-modal';
import Notifications from '../user-info/notifications';





const Navbar = () => {
    let searchRef = useRef(null)
    let navigate = useNavigate()
    let {user} = useAuthContext()
    const [isUserInfoOpen, setUserInfoOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationsbar,setnotificationsbar] = useState(false)

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
   
  const handleNotificationBar = () =>{
    setnotificationsbar(!notificationsbar)
    setUserInfoOpen(false)
  }
   
    const handleUserInfo = () => {
        setUserInfoOpen(!isUserInfoOpen); 
        setnotificationsbar(false)
    };


  return (
<div className='fixed top-0 w-full z-10 ' >
<div className='bg-white flex items-center justify-between px-5 py-2 shadow-md ' >
        {/* {Navbar Image} */}
        <div>
            <Link to={"/"}><img src="/logo-with-name.png" className='w-[15vh] sm:w-[20vh]'  alt="" /></Link>
        </div>


        {/* Search bar */}
       {
        localStorage.getItem("user") ?  <div className=''>
        <input ref={searchRef} type="text" placeholder='Search ...' className='hidden lg:block sm:w-[50vw] h-9 border-2 border-[#adadad] bg-gray-100 rounded-xl px-6' />
    </div> : ""
       }




    {/* Navbar icons */}
    {
        localStorage.getItem("token") ? <div className='flex gap-3'>
        <div className='bg-[#d7e8ed] flex justify-center items-center rounded-full w-[4vh] sm:w-[6vh]'><Link to={"/"}><FaHome/></Link></div>
        <div onClick={handleNotificationBar} className={`${notificationsbar ? "opacity-50" : ""} bg-[#d7e8ed] flex justify-center items-center rounded-full w-[4vh] sm:w-[6vh]`}><FaBell/></div>
            <img onClick={handleUserInfo} src={user.image} className={`w-[4vh] rounded-full sm:w-[6vh] cursor-pointer ${isUserInfoOpen ? "opacity-50" : ""}` } alt="" />
           
        </div> : ""
    }
    




    </div>

    
    {
      localStorage.getItem("token") ? <div className={`transition ${isUserInfoOpen ? 'absolute' : "hidden"} top-16 rounded-md top-18 right-5 bg-[#EEEEEE] w-[40%] sm:w-[15%] z-1  flex flex-col `}>
      <Link to={`/`}  className='text-md font-bold px-2 py-3 flex gap-2 items-center '> <span><FaHome/></span> Home Page</Link>
      <hr className='border-[lightgray]' />
  <Link to={`/user-profile/${user._id}`}  className='text-md font-bold px-2 py-3 flex gap-2 items-center '> <span><CgProfile/></span> View Profile</Link>
  <hr className='border-[lightgray]' />
  <a onClick={(e)=>{
      e.preventDefault()
      toggleModal()
  }} className='text-md font-bold px-2 py-3 flex gap-2 items-center' href=""><span><CiLogout/></span> Log Out</a>
  
 
<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal} />
</div> : null
    }
    
     
     {
      localStorage.getItem("token") ? <div>
        {
          notificationsbar ? <div className='min-h-[20vh] sm:w-[25vw] sm:top-[9vh] absolute right-2 top-[6.5vh] w-[60vw] bg-[#EEEEEE] rounded-lg px-2 py-2 '>
          <Notifications/>
          </div> : ""
        }
      </div> : ""
     }

</div>
  )
}

export default Navbar
