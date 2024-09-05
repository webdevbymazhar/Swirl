import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/auth-context';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';

const RightSidebar = () => {
  let { user } = useAuthContext();
  let [followers, setFollowers] = useState([]);
  let [loading,setloading] = useState(false)
  
  

  let fetchFollowers = async () => {
    if (!user || !user._id) {
        console.error("User ID is not available");
        return;
      }
    setloading(true)
    try {
       
      let res = await axios.get(`http://localhost:8000/get-followers/${user._id}`);
      if(res){
        setFollowers(res.data);
        
      }
     
    } catch (error) {
      console.error(error);
     
    }finally{
        setloading(false)
    }
  };

  useEffect(()=>{
    if (user && user._id) {
        fetchFollowers();
      }
  },[user])

  

  return (
    <div className='mt-4 mr-2 ml-2'>
      <div style={{border:"1px solid black"}} className='fixed  rounded-md bg-[#DCF5F5] w-[22%] ml-3 px-4 py-2'>
        <p className='font-bold'>Sponsored</p>
        <img src="ad.jpg" className='rounded-md mt-2' alt="" />
        <hr className='border-[gray] mt-4' />
        <p className='mt-2 font-bold mb-3'>Followers</p>

        <div className='flex flex-col gap-3'>
       
       
        {
            loading ? "loading" : <div>
                {followers.map((v,i)=>{
                    return <div key={i} className='mb-3'>
                    <div className='flex items-center gap-2'>
                    <img src={v.image} className='w-[7vh] rounded-full' alt="" />
                    <div className='flex  flex-col '>
                        <p className='text-base font-bold'>{v.fname} {v.lname}</p>
                        <p className='flex items-center gap-1'><span className='font-bold'><FaLocationDot/></span> {v.country}</p>
                    </div>
                    </div>
                </div>
                })}
            </div>
        }

            
            
           
            

        </div>
        
      </div>
    </div>
  );
};

export default RightSidebar;