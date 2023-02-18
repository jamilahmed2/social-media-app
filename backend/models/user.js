import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    id:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const User = mongoose.model('Users', UserSchema);
  export default  User;