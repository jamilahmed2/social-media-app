import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts'
import { Container, Grow, Grid, Paper, AppBar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { MuiChipsInput } from 'mui-chips-input'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileBase from 'react-file-base64'
import './home.css'
import { updatePost, getPostsBySearch } from '../../actions/posts'
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '../Pagination/Pagination';
import useStyle from './style'


// url search params to know on which page are user currently
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const classes = useStyle();
    const ref = useRef(null)
    const [open, setOpen] = React.useState(false);

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const [currentId, setCurrentId] = useState(0)
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profileData'));

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');


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


    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };
    
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    const handleChange = (newTag) => {
        setTags(newTag)
    }
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
                            <TextField name='title' varient="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <TextField name='message' varient="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                            <TextField name='tags' varient="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                            <Button variant="contained" style={{ backgroundColor: "red", color: "#fff" }} size="small" onClick={clear}>Clear</Button>
                            <Button style={{ backgroundColor: "#00b300", color: "#fff" }} variant="contained" type="submit" size="small" >Submit</Button>
                        </form>
                    </DialogContent>

                </Dialog>
            </div>
            <Grow in>
                <Container maxWidth="xl">

                    <Grid container alignItems="stretch" spacing={3} id='search'>
                        <Grid item xs={12} md={9}>

                            <Posts setCurrentId={setCurrentId} updateNote={updateNote} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}  >
                            <Paper elevation={6} id='searchPaper'>
                                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                    <TextField
                                        name='search'
                                        variant='outlined'
                                        label='Search Post'
                                        fullWidth
                                        value={search}
                                        onKeyPress={handleKeyPress}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </AppBar>
                                <MuiChipsInput
                                    
                                    style={{ margin: '10px 0px' }}
                                    value={tags}
                                    // onAdd={handleAdd}
                                    // onDelete={handleDelete}
                                    onChange={handleChange}
                                    label='Search Tags'
                                    variant='outlined'
                                />
                                <Button variant='contained' onClick={searchPost} className={classes.searchButton} color='primary' sx={{ margin: '5px' }}>Search</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                        <Grid item xs={12} md={6}>
                            {(!searchQuery && !tags.length) && (
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home