import { Router } from 'express';
import userRouter from './api/user.route';
<<<<<<< HEAD
import programRouter from './api/program.route';  
import taskRouter from './api/task.route'; 
const routes = Router();
routes.use('/users', userRouter);
routes.use('/programs', programRouter);
routes.use('/tasks', taskRouter);  
export default routes;




=======

const routes = Router();
routes.use('/users', userRouter);

export default routes;
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
