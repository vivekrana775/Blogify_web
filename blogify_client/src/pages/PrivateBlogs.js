import React, { useContext } from 'react'
import BlogList from '../components/BlogList'
import { AuthContext } from '../context/authContext'
import { useLocation } from 'react-router-dom'

const PrivateBlogs = () => {
  const {posts} = useContext(AuthContext)
  const state = useLocation().state
  const privatePosts  = posts.filter((item)=>item.user_id===state)

  return (
    <>
    <BlogList posts={privatePosts} />
    </>
  )
}

export default PrivateBlogs
