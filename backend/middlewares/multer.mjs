import multer, {diskStorage} from 'multer'

const storage = diskStorage({})

const videoFileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('video')) {
        cb('Supported only video files!', false)
    }
    cb(null, true)
}

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb('Supported only image files!', false)
    }
    cb(null, true)
}

const uploadVideo = multer({storage, fileFilter: videoFileFilter})
const uploadImage = multer({storage, fileFilter})

export {uploadImage, uploadVideo}