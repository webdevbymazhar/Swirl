import React, { useEffect } from 'react'
import CreatePost from '../components/posts/create-post'
import UserInfo from '../components/user-info/user-info'
import FollowersPosts from './followers-posts'
import RightSidebar from '../components/user-info/right-sidebar'

const Home = () => {
  return (
    
    <div className='pt-14'>
      <div className='grid grid-cols-12 '>
        <div className='hidden sm:block sm:col-span-3'>
        <div className='mt-4 mr-2 ml-2'>
         <div className='fixed w-[22%] ml-3 '>
               <UserInfo/>
          </div>
         </div>
         
        </div>
        <div className="col-span-12 sm:col-span-6 mt-2">
          
          <CreatePost/>
          <FollowersPosts/>
          
        </div>
        <div className='z-1hidden sm:block sm:col-span-3'>
         <RightSidebar/>
        </div>
      </div>
    </div>
  )
}

export default Home
