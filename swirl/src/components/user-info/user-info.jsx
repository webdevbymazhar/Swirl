import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/auth-context'
import { FaLocationDot } from 'react-icons/fa6'
import { FaUser, FaUserAlt } from 'react-icons/fa'
import {RiUserFollowFill} from 'react-icons/ri'
import {SlUserFollow} from 'react-icons/sl'
import { Link } from 'react-router-dom'
import UpdateUserModal from '../modals/update-ser-modal'

const UserInfo = () => {
    let {user,fetchUser} = useAuthContext()
    const [userdata, setuserdata] = useState({
        followers: 0,
        following: 0
    });
   
    if(!user){
        return <div>loading...</div>
    }
    
    useEffect(() => {
        if (user) {
            setuserdata({
                followers: user.followers ? user.followers.length : 0,
                following: user.following ? user.following.length : 0,
            });
        }
    }, [user]);
    
  return (
    <>
    <div>
      <div style={{border:"1px solid black"}} className=' rounded-md px-3 py-5 bg-[#DCF5F5]'>
        <div className='flex items-center gap-3'>
            <img src={user.image} alt="" className='w-[5vw] rounded-full' />
            <div>
                <p className='text-xl font-bold '>{user.fname} {user.lname}</p>
                <p className='flex items-center text-[#6a6a6a]'><FaLocationDot/>  {user.country}</p>
            </div>
        </div>
        <hr className='border-[gray] mt-4' />
        <div className='mt-3'>
            <p className='flex items-center justify-start gap-2 text-[17px] mt-1'> <FaUser/> <b>Bio :</b> {user.bio}</p>
            <p className='flex items-center justify-start gap-2 text-[17px] mt-1' ><SlUserFollow /> <b>Followers :</b> {userdata.followers}</p>
            <p className='flex items-center justify-start gap-2 text-[17px] mt-1'> <RiUserFollowFill /> <b>Following :</b> {userdata.following}</p>
        </div>
        <hr className='border-[gray] mt-6' />
         <div className='flex items-center justify-center gap-3 mt-4'>
            <button className='bg-black text-white py-1 px-2 rounded-md'><Link to={`/user-profile/${user._id}`}>View Profile</Link></button>

         </div>
      </div>
      
    </div>
   
    </>
   
  )
}

export default UserInfo
