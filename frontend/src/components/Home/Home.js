import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { Container, Grow, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileBase from 'react-file-base64'
import { updatePost } from '../../actions/posts'
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
    const ref = useRef(null)
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profileData'));

    // populating note in form to edit
    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const updateNote = (post) => {
        ref.current.click(setOpen(true));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        handleClose()
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

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])


    return (
        <>
            <div>
                <Button ref={ref} variant="outlined" sx={{ display: 'none' }} >
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>Editing Post
                        <Button onClick={handleClose} variant="outlined" color="primary" type="submit" size="small"  ><CloseIcon /></Button>
                    </DialogTitle>
                    <DialogContent>
                        <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: "1rem",
                            margin: "1rem"
                        }}>
                            {/* <TextField name='creator' varient="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                            <TextField name='title' varient="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <TextField name='message' varient="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                            <TextField name='tags' varient="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                            <Button variant="contained" style={{ backgroundColor: "red", color: "#fff" }} size="small" onClick={clear}>Clear</Button>
                            <Button style={{ backgroundColor: "#00b300", color: "#fff" }} variant="contained" type="submit" size="small" >Submit</Button>
                        </form>
                    </DialogContent>
                    {/* <DialogActions>
                    </DialogActions> */}
                </Dialog>
            </div>
            <Grow in>
                <Container>
                    <Grid container alignItems="stretch" spacing={2}>
                        <Grid item xs={12}>
                            <Posts setCurrentId={setCurrentId} updateNote={updateNote} />
                        </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid> */}
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home