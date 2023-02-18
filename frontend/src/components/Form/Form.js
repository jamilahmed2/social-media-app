import React, { useState } from "react";
import useStyles from './style'
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { createPost } from '../../actions/posts'
import { TextField, Typography, Button, Paper, Container } from "@mui/material";

const Form = ({ }) => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profileData'));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create and like the posts
        </Typography>
      </Paper>
    )
  };

  return (
    <>
      <Container>
          <Paper sx={{ padding: 1 }} >
            <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: "1rem"
            }}>
              <Typography varient="h6">Uploading a Post</Typography>
              <TextField name='title' varient="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
              <TextField name='message' varient="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
              <TextField name='tags' varient="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
              <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
              <Button style={{ marginBottom: 10, backgroundColor: "#00b300", color: "#f2f2f2" }} varient="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
              <Button style={{ marginBottom: 10, backgroundColor: "#d32f2f", color: "#f2f2f2" }} varient="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
          </Paper>
      </Container>
    </>

  )
}

export default Form