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
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
})

userShema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userShema.methods.comparePassword = async function(password) {
	const result = await bcrypt.compare(password, this.password)
	return result
}

export default mongoose.model("User", userShema)