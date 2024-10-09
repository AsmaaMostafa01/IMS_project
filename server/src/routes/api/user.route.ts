import * as express from 'express';
import { user } from '../../controllers';
import isAuth, { hasValidRole } from '../../middleware/auth.middleware';
import {
  isUserValidForCreate, isUserValidForLogin, isValidKeyword,
} from '../../middleware';
import { uploadImages } from '../../middleware/file.middleware';
import { UserTypeEnum } from '../../types';


const router = express.Router();

// Admin 

router.post('/create-first-admin', (req, res, next) => {
  console.log('Received a request to create the first admin user');
  next();
}, user.createFirstAdmin);
 // No authentication required for this route
//admin and teamleaders can add trainees
router.route('/')
<<<<<<< HEAD
  .post(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), uploadImages('profiles').single('picture'), isUserValidForCreate, user.create)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN]), user.getAll);
=======
  .post(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN,UserTypeEnum.TEAMLEADER]), uploadImages('profiles').single('picture'), isUserValidForCreate, user.create)
  .get(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.SADMIN,UserTypeEnum.TEAMLEADER]), user.getAll);
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
  
// router.route('/filter')
//   .all(isAuth)

// router.route('/password-forget')
//   .put(isValidEmail, user.forgetPassword);

// router.route('/password-reset')
//   .put(isValidPassword, user.resetPassword);

router.route('/login')
  .post(isUserValidForLogin, user.login);

  //Update existing user admin and teamleader who can update 
router.route('/:id')
  .all(isAuth)
  .put(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), user.update)
<<<<<<< HEAD
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN]), user.delete)
=======
  .delete(isAuth, hasValidRole([UserTypeEnum.ADMIN, UserTypeEnum.TEAMLEADER]), user.delete)
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
  .get(user.getById)



export default router;
