import { Router } from 'express';
import { verifyLogin, verifyRole } from '../Controllers/auth.controller.js';
import {
	paymentIntent,
	createBooking,
	getMyBookings,
} from '../Controllers/booking.controller.js';

const router = Router();

router.get(
	'/create-payment-intent/:tourId',
	verifyLogin,
	verifyRole('user'),
	paymentIntent
);
router.post('/create-booking', createBooking);
router.get('/my-bookings', verifyLogin, getMyBookings);
export default router;
