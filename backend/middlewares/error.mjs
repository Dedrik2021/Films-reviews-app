const errorHandler = (err, req, res, next) => {
	res.status(401).json({error: err.message || err})
}

export {errorHandler}