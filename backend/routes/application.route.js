import express from 'express'
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { applyJob , getAppliedJobs,gatApplicants,updateStatus} from '../controllers/application.controller.js';
const router = express.Router()

router.route('/apply/:id').post(isAuthenticated,applyJob);
router.route('/get').get(isAuthenticated,getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated,gatApplicants);
router.route('/status/:id/update').put(isAuthenticated,updateStatus);

export default router; 