import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title:string,
    message:string,
    creator:string,
    tags:[string],
    selectedFile:string,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:date,
        default:new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
module.exports = PostMessage;