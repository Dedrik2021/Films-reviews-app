import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userShema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    password: { 
        type: String,
        require: true,
    }
})

userShema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export default mongoose.model("User", userShema)