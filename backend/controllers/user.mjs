import User from '../models/user.mjs'

const create = async (req, res) => {
    const {name, email, password} = req.body

    const oldUser = await User.findOne({email})
    if (oldUser) return res.status(401).json({error: "This email already in use!"})

    const newUser = new User({name, email, password})
    await newUser.save()

	res.status(201).json({user: newUser});
};

export { create };
