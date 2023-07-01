

const createActor = (req, res) => {
    console.log(req.body);

    res.status(201).json({message: "Actor was created!"})
}

export {createActor}