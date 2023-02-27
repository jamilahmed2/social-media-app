import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid, } from "@mui/material"
import useStyles from './style'

const Posts = ({ setCurrentId, updateNote }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) {
    return 'No posts'
  };
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {
          posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={4}>
              <Post post={post} setCurrentId={setCurrentId} updateNote={updateNote} />
            </Grid>
          ))
        }
      </Grid>
    )
  )
}

export default Posts