import express from 'express'
import { register,login,updateProfile, logout } from '../controllers/user.controller.js'
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { fileUpload } from '../middlwares/fileStor.js';

const router = express.Router()

router.route('/register').post(fileUpload.single('file'),register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated,fileUpload.single('file'),updateProfile);

export default router;