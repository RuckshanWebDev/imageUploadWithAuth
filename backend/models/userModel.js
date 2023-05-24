import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Username is Must']
    },

    email: {
        type: String,
        required: [true, 'Username is Must'],
        unique: [true, 'Email already exists']
    },

    password: {
        type: String,
        required: [true, 'Password  is Must']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 8);

    next()
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    const res = await bcrypt.compare(enteredPassword, this.password)
    return res
}

const User = mongoose.model('Users', UserSchema)
export default User