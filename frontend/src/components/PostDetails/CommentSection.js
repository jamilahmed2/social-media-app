import { Button, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyle from './style'

import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const classes = useStyle();
    const [comments, setComments] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profileData'))

    const handleClick = () => {
        const finalComment = `${user.result.name}:${comment}`
        dispatch(commentPost(finalComment, post._id))
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.innerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            Comment {i}
                        </Typography>
                    ))}
                </div>
                <div style={{ width: '50%' }}>
                    <Typography gutterBottom variant='h6'>Write a comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleClick}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default CommentSection