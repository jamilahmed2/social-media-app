import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import useStyles from './style'
const Post = ({ post }) => {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography varient="h6">{post.creator}</Typography>
        <Typography varient="body2">{moment(post.creator).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: "#fff" }} size="small" onClick={() => { }}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography varient="body2" color='textSecondary'>{post.tags.map((tag) => `# ${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} varient="h5" gutterBottom >{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color='primary' onClick={() => { }}>
          <ThumbUpAltIcon fontSize='small' />
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color='primary' onClick={() => { }}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post