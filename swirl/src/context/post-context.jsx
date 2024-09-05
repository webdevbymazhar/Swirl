import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './auth-context'
let PostsContext = createContext()
const PostContext = ({children}) => {
    let {user} = useAuthContext()
    let [userposts,setuserposts] = useState([])
    let [followersposts,setfollowersposts] = useState([])
    let getPosts = async (id) =>{
        try {
            let res = await axios.get(`http://localhost:8000/post/post-by-user/${id}`)
            if(res){
                setuserposts(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
        }
    } 

    let getPostsByFollowers = async () =>{
       try {
         if(user){
            let res = await axios.get(`http://localhost:8000/get-followers-post/${user._id}`)
         if(res){
               setfollowersposts(res.data)
         }
         }
       } catch (error) {
        console.log(error);
        
       }

    }
  return (
    <PostsContext.Provider value={{userposts,setuserposts,getPosts,getPostsByFollowers,followersposts}}>
        {children}
    </PostsContext.Provider>
  )
}

export const  usePostContext = () => useContext(PostsContext)

export default PostContext
