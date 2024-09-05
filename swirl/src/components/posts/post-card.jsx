import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/auth-context'
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { FaLocationDot } from 'react-icons/fa6'

const PostCard = ({userimg,username,content,image,fname,lname,country}) => {
    let {user} = useAuthContext()

  return (
    <div className='w-full h-auto p-2 mt-2 '>
     <div style={{border:"1px solid black",borderColor:"black"}} className=' rounded-lg '>
     <div className='px-4'>
        <div className='flex items-center gap-4 mt-3'>
            <img src={userimg} className='w-[12vw] rounded-full sm:w-[4vw]' alt="" />
            <div>
            <p className='text-lg font-bold'>{fname} {lname}</p>
            <p className='flex items-center gap-1'><FaLocationDot/>{country}</p>
            </div>
        </div>
      </div>

      

      <div >
        <img src={image} className='w-full h-auto mt-3 ' alt="" />
        <div className='flex gap-3 px-2 pt-2'>
        <div className='flex items-center gap-1'>
            <span className='sm:text-lg font-bold '><AiOutlineLike/> </span>
             <p style={{}}>Likes (0)</p>
             </div>
        <div className='flex items-center gap-1'>
            <span className='sm:text-lg' style={{fontWeight:"bold"}}><AiOutlineComment/> </span>
            <p >Comments (0)</p>
            </div>
        
      </div>
        <p style={{lineHeight:"2.5vh"}} className='px-2 pt-2 mb-3 sm:text-md'>
            <span className='font-bold text-lg '>{username}</span> {content}</p>
      </div>
      

     </div>
      
      
    </div>
  )
}

export default PostCard
