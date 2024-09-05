import React, { useEffect, useState } from 'react'
import PostCard from '../components/posts/post-card'
import { usePostContext } from '../context/post-context'

const Posts = ({userid,userImg,userfname,userlname,username,country}) => {
      let {userposts,getPosts} = usePostContext()

    useEffect(()=>{
         getPosts(userid)
    },[])
  return (
    <div>
        
         {
            userposts.map((v,i)=>{
                return <PostCard country={country}  userimg={userImg} username={username} fname={userfname} lname={userlname} image={v.image} content={v.content} />
            })
         }
    </div>
  )
}

export default Posts
