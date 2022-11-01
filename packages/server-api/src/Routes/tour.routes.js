import { Router } from 'express';
import { multerForTours } from '../Utils/multer.file-upload.js';
import { verifyLogin, verifyRole } from '../Controllers/auth.controller.js';
import reviewRouter from './review.routes.js';
import {
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour,
} from '../Controllers/tour.controllers.js';
const router = Router();
router.use('/:tourId/reviews', reviewRouter);

router.get('/', getAllTours);
router.route('/:tourId').get(getTour);
router.use(verifyLogin, verifyRole('admin'));
router.post('/', multerForTours, createTour);
router.route('/:tourId').patch(multerForTours, updateTour).delete(deleteTour);

export default router;
