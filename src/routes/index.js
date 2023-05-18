import express, { Router }  from 'express';
import path                 from 'path';
import { fileURLToPath }    from 'url';

import userRouter       from './UserRouter.js';
import authRouter       from './authRouter.js';
import postRouter       from './postRouter.js';
import { checkAuth }    from '../controllers/middleware/getAuth.js';
import { uploads }      from '../controllers/middleware/upload.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = new Router();

router.use('/user',     userRouter)
router.use('/auth',     authRouter)
router.use('/post',     postRouter)

router.use('/static', express.static(path.join(__dirname,'/../../static')))
router.post('/static', checkAuth, uploads.single('image'), (req, res) => {
    res.json({
        url: `/static/${req.filename}`
    })
})


export default router;