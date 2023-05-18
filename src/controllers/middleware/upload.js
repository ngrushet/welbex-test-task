import multer from "multer";
import moment from "moment";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/');
    },
    filename: (req, file, cb)=>{
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const filename = `${date}-${file.originalname}`.replace(/\s/gi, '_')
        req.filename = filename;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024*1024*1024*10 
}

export const uploads = multer({
    storage,
    fileFilter,
    limits
})

