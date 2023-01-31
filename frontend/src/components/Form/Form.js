import React, { useState } from "react";
// import useStyles from './style'
import FileBase from 'react-file-base64'
import { TextField, Typography, Button, Paper } from "@mui/material";

const Form = () => {
  // const classes = useStyles();

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });


  const handleSubmit = () => { }
  const clear = () => { }

  return (

    <Paper sx={{ padding: 1 }} >
      <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap:"1rem"
      }}>
        <Typography varient="h6">Creating a Post</Typography>
        <TextField name='creator' varient="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name='title' varient="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' varient="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' varient="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button style={{marginBottom: 10, backgroundColor: "#06db89",color:"#f2f2f2"}} varient="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button style={{marginBottom: 10, backgroundColor: "#d32f2f",color:"#f2f2f2"}} varient="contained" color="secondary" size="small" onClear={clear} fullWidth>Clear</Button>
      </form>
    </Paper>

  )
}

export default Form