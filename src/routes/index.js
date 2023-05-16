import Router from 'express';

import userRouter           from './UserRouter.js';
// import doctorRouter         from './DoctorRouter.js' 
// import slotRouter           from './SlotRouter.js';

const router = new Router();
router.use('/user',     userRouter)
// router.use('/doctor',   doctorRouter)
// router.use('/slot',     slotRouter)

export default router;