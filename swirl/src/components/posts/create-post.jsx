import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/auth-context'
import { CiCirclePlus, CiImageOn, CiVideoOn } from 'react-icons/ci'
import axios from 'axios'
import toast from 'react-hot-toast'
import { usePostContext } from '../../context/post-context'

const CreatePost = () => {
      let {getPosts,getPostsByFollowers} = usePostContext()
    let {user,fetchUser} = useAuthContext()
    let [loading,setLoading] = useState(false)
    let [data,setData] = useState({
        content : "",
        image : "",
    })

    useEffect(()=>{
        setData({
         ...data, userId : user._id
        })
    },[user])
 
 
 let handleData = (e) =>{
     if(e.target.name === "image"){
         setData({...data,[e.target.name] : e.target.files[0]})
     }else{
         setData({...data,[e.target.name] : e.target.value})
     }
     console.log(data);
     
 }

 

 let submitData = async (e) =>{
    e.preventDefault()
    setLoading(true)
    // console.log(data);
    try {
        let res = await axios.post("http://localhost:8000/post/create-post",data,{
            headers:{
                "Content-Type" : 'multipart/form-data'
            }
        })
        if(res){
            toast.success("Post Created Successfully !")
            fetchUser(user._id)
            getPosts(user._id)
            getPostsByFollowers(user._id)
            setData({
                content : "",
                image : "",
            })
            

        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
        console.log(error);
        
    }finally{
     setLoading(false)
    
    }
    
 }
  return (
    <div className='p-3  '>
      <div className='bg-[#dcf5f5] rounded-lg '>
       <div className='h-auto px-3 py-5'>
       <div className='flex items-center justify-between gap-4'>
          <img src={user.image} className='w-[6vh] sm:w-[7vh] rounded-full' alt="" />
          <textarea onChange={handleData}  name='content'  placeholder="what's on your mind .." type="text" className='border-[1px] rounded-lg border-[lightgray] px-2 w-full h-12 ' />
       </div>
       <hr className='border-[#bdbcbc] mt-4' />
       <div className='flex items-center justify-between' >


       <div className='flex  items-center   gap-3 mt-4'>
        
        <div>
        <label className='cursor-pointer flex items-center justify-center gap-1 text-[4vw] sm:text-[1.2vw] font-medium' htmlFor="image"><CiCirclePlus /> Image</label>
        <input onChange={handleData}  name='image' className='hidden' id='image' type="file"  />
        </div> 

        {
            data.image === "" ? <p>( No Image Selected ) </p> : <p className='font-bold'>( Image Selected )</p>
        }


       
        </div>

        <div className='bg-black px-3 rounded-lg py-1 mt-4'><button onClick={submitData} className='text-white text-[4vw] sm:text-[1.2vw]  font-medium '>{loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Post"
          )}</button></div>


    
       </div>
      
       </div>
      </div>
    </div>
  )
}

export default CreatePost
