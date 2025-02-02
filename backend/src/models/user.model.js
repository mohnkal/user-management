import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean
});

const User = mongoose.model('User', userSchema);
export default User;