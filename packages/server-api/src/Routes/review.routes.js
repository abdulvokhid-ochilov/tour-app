import { Router } from 'express';
import { verifyLogin, verifyRole } from '../Controllers/auth.controller.js';

import {
	getAllReviews,
	createReview,
	myReviews,
	updateReview,
	deleteReview,
} from '../Controllers/review.controller.js';

const router = Router({ mergeParams: true });

router.get('/', getAllReviews);
router.use(verifyLogin, verifyRole('user'));
router.post('/', createReview);
router.get('/my-reviews', myReviews);
router.route('/:reviewId').patch(updateReview).delete(deleteReview);
export default router;
