import { Button, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyle from './style'

import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profileData'));
    // getting our redux data from backend and putting it in comments
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments); //  <----
    const classes = useStyle();
    const commentsRef = useRef();

    const handleComment = async () => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    // commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.innerContainer}>
                    <Typography gutterBottom variant='h6'><strong> Comments:</strong></Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(":")[0]}</strong> {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '50%' }}>
                        <Typography gutterBottom variant='h6'><strong>Write a comment</strong></Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleComment}>Submit</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection