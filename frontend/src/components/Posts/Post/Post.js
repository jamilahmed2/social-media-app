import React, { useState } from 'react'
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profileData'));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const handleEdit = () => {
    updateNote()
    setCurrentId(post._id)
  }
  // (user?.result?.sub || user?.result?._id)
  const userId = (user?.result?.sub || user?.result?._id);
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
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

        <Button size="small" color='primary' disabled={!user?.result} onClick={handleLike}>
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