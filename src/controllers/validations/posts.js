import { body, oneOf } from "express-validator";

export const postValidator = oneOf(
    [
        body('message').isString(),
        body('media').isURL(),
    ], {
    message: 'At least one of content type must be provided',
});
