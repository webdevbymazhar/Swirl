import React, { useEffect } from 'react';
import { usePostContext } from '../context/post-context';
import { useAuthContext } from '../context/auth-context';
import PostCard from '../components/posts/post-card';

const FollowersPosts = () => {
  const { user } = useAuthContext();
  const { getPostsByFollowers, followersposts } = usePostContext();

  useEffect(() => {
    if (user && user._id) {
      getPostsByFollowers(user._id); 
    }
  }, [user]); 

  return (
    <div>
      {followersposts && followersposts.length > 0 ? (
        followersposts.map(post => (
          <div key={post._id}>
            <PostCard image={post.image} content={post.content} userimg={post.user.image} username={post.user.username} fname={post.user.fname} lname={post.user.lname} country={post.user.country}/>
          </div>
        ))
      ) : (
        <p>No posts from followers.</p>
      )}
    </div>
  );
};

export default FollowersPosts;