import express from 'express'
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { registerCompany,getCompany,getCompanyById,updateCompany } from '../controllers/company.controller.js';
import { fileUpload } from '../middlwares/fileStor.js';

const router = express.Router()

router.route('/register').post(isAuthenticated,registerCompany);
router.route('/get').get(isAuthenticated,getCompany);
router.route('/get/:id').get(isAuthenticated,getCompanyById);
router.route('/update/:id').put(isAuthenticated,fileUpload.single('file'),updateCompany);

export default router;