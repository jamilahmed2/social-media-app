import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import useStyles from './style'
import { useDispatch } from "react-redux"
import { deletePost,likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.Card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography varient="h6">{post.creator}</Typography>
        <Typography varient="body2">{moment(post.creator).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button size="small" onClick={() => setCurrentId(post._id)}>
          <EditIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography varient="body2" color='textSecondary'>{post.tags.map((tag) => `# ${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} varient="h5" gutterBottom >{post.title}</Typography>
      <CardContent>
        <Typography varient="h5" gutterBottom >{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color='primary' onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize='small' />
          Like 
          {post.likeCount}
        </Button>
        <Button size="small" color='primary' onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post