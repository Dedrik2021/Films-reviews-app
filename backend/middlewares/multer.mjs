import multer from 'multer'

const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb('Supported only image files!', false)
    }
    cb(null, true)
}

export const uploadImage = multer({storage, fileFilter})