import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../components/posts/post-card'
import { FaUser } from 'react-icons/fa'
import { SlUserFollow } from 'react-icons/sl'
import { RiUserFollowFill } from 'react-icons/ri'
import CreatePost from '../components/posts/create-post'
import Posts from './Posts'
import { useAuthContext } from '../context/auth-context'
import { FaLocationDot } from 'react-icons/fa6'
import UpdateUserModal from '../components/modals/update-ser-modal'


const UserProfile = () => {
    let {user} = useAuthContext()
    let {id} = useParams()
    let [data,setdata] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    let getData = async () =>{
      try {
        let res = await axios.get(`http://localhost:8000/user/get-user-by-id/${id}`);
        setdata(res.data.user)

      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
<>
{
    data ? <div className='pt-14'>
    <div>
      <img className='w-full h-[20vh] object-cover sm:h-[40vh] ' src={data.coverImg} alt="" />
      <div className='w-full h-[10vh] absolute top-[19vh] sm:top-[35vh]'>
       <img src={data.image} className='shadow-md w-[30vw] sm:w-[10vw] border-4 border-white block m-auto rounded-full' alt="" />
      </div>

      <div className='flex flex-col w-full items-center mt-[9vh]'>
        <p className='text-2xl font-bold'>{data.fname} {data.lname}</p>
        <p>{data.bio}</p>
      </div>
         
         <div className='grid grid-cols-12 mt-3 '>

            <div className='col-span-12 sm:col-span-4 p-2 '>
             <div className=' border-2 bg-[#DCF5F5] rounded-md  '>
               <div className='px-2 py-3'>
                <p className='text-xl font-bold mb-2'>Details :</p>
                <p className='text-lg font-bold flex gap-2 items-center'><FaUser/> Username:  <span className='font-medium'>{data.username}</span></p>
                <p className='text-lg font-bold flex gap-2 items-center'><RiUserFollowFill/> Followers:  <span className='font-medium'>{data.followers.length}</span></p>
                <p className='text-lg font-bold flex gap-2 items-center'><SlUserFollow />  Following : <span className='font-medium'>{data.following.length}</span></p>
                <p className='text-lg font-bold flex gap-2 items-center'><FaLocationDot /> Country : <span className='font-medium'> {data.country}</span></p>
                <button onClick={openModal} className='bg-black py-1 px-2 mt-3 rounded-md text-white '>Update Profile</button>
               
               </div>
             </div>
             
            </div>
            <div className='col-span-12 sm:col-span-8'>
                <CreatePost/>
            </div>

            

         </div>
            <div className='grid grid-cols-12'>
            <div className="col-span-12 sm:col-span-3"></div>
            <div className="col-span-12 sm:col-span-6">
                <Posts userid={data._id} country={data.country} username={data.username} userImg={data.image} userfname={data.fname} userlname={data.lname}/>
            </div>
            <div className="col-span-12 sm:col-span-3"></div>
            </div>
    </div>
   </div> : "Loading"
}
<UpdateUserModal isOpen={isModalOpen} onClose={closeModal} />
</>
    
  )
}

export default UserProfile
