import Router from 'express';
import PostController from '../controllers/PostController.js';
import { checkAuth } from '../controllers/middleware/getAuth.js';
import { postValidator } from '../controllers/validations/posts.js';
import { handleValidationErrors } from '../controllers/middleware/handleValidationErrors.js';
import { checkAuthor } from '../controllers/middleware/checkAuthor.js';
 
const postRouter = new Router();

postRouter.get  ('/',       PostController.getAll)
postRouter.get  ('/:id',    PostController.getOne)
postRouter.post (
    '/', 
    checkAuth,
    postValidator,
    handleValidationErrors,
    PostController.create
)
postRouter.put  (
    '/:id',
    checkAuth,
    checkAuthor,
    postValidator,
    handleValidationErrors,
    PostController.update
)
postRouter.delete   (
    '/:id',
    checkAuth,
    checkAuthor,
    PostController.delete
)

export default postRouter;