import Router               from 'express';
import AuthController       from '../controllers/AuthController.js';
import { checkAuth } from '../controllers/middleware/getAuth.js';
import { loginValidator, registerValidator } from '../controllers/validations/auth.js';
import { handleValidationErrors } from '../controllers/middleware/handleValidationErrors.js';

const authRouter = new Router();

authRouter.post (
    '/login',
    loginValidator,
    handleValidationErrors,
    AuthController.login
)
authRouter.post (
    '/registration',
    registerValidator,
    handleValidationErrors,
    AuthController.registration
)    
authRouter.get  (
    '/auth',
    checkAuth,
    AuthController.getAuth
)

export default authRouter;