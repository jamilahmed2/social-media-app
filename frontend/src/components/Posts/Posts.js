import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
// import useStyles from './style'

const Posts = () => {
  // const classes = useStyles();
  const posts = useSelector((state) =>  state.posts )
  console.log(posts)
  return (
    <div>
      Posts
      <Post />
    </div>
  )
}

export default Posts