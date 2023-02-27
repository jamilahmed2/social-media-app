import React from 'react'
import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import useStyles from './style'
import { useDispatch } from "react-redux"
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import './post.css'

const Post = ({ post, setCurrentId, updateNote }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profileData'));

  const handleEdit = () => {
    updateNote()
    setCurrentId(post._id)
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  const openPost = (e) => {
    navigate(`/posts/${post._id}`)
  };


  return (
    <Card className={classes.Card} raised elevation={6}>
      <div className='cardAction' onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography varient="h6">{post.name}</Typography>
          <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        <div style={{ marginTop: "2.5rem" }} className={classes.details}>
          <Typography varient="body2" color='textSecondary'>{post.tags.map((tag) => `# ${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} varient="h5" gutterBottom >{post.title}</Typography>
        <CardContent>
          <Typography varient="h5" color='textSecondary' component='p' >{post.message}</Typography>
        </CardContent>
      </div>
      {(user?.result?.sub === post?.creator || user?.result._id === post?.creator) && (
        <div className='overlay2'>

          <Button size="small" onClick={handleEdit}>
            <EditIcon fontSize='medium' />
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>

        <Button size="small" color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>

        {(user?.result?.sub === post?.creator || user?.result._id === post?.creator) && (
          <Button size="small" color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}

      </CardActions>
    </Card>
  )
}

export default Post