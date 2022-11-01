import Booking from '../Models/booking.model.js';
import Tour from '../Models/tour.model.js';
import User from '../Models/user.model.js';
import { jwtSign, jwtVerify } from '../Utils/jwt.js';
import catchAsyncError from '../Utils/catchAsyncError.js';
import CustomError from '../Utils/CustomError.js';
import Stripe from 'stripe';

export const paymentIntent = catchAsyncError(async (req, res, next) => {
	const tour = await Tour.findById(req.params.tourId);
	const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
	const paymentToken = await jwtSign({
		tourId: tour._id,
		userId: req.user._id,
		price: tour.price,
	});
	const params = {
		currency: 'usd',
		payment_method_types: ['card'],
		amount: tour.price * 100,
		description: tour.summary,
		receipt_email: req.user.email,
	};
	const paymentIntent = await stripe.paymentIntents.create(params);
	res.status(200).json({
		status: 'success',
		message: 'Payment intent created',
		clientSecret: paymentIntent.client_secret,
		paymentToken,
	});
});

export const createBooking = catchAsyncError(async (req, res, next) => {
	const decoded = await jwtVerify(req.body.paymentToken);
	if (!decoded) return next(new CustomError('Invalid payment token', 400));
	await Booking.create({
		tour: decoded.id.tourId,
		user: decoded.id.userId,
		price: decoded.id.price,
	});
	res.status(200).json({
		status: 'success',
		message: 'Booking created',
	});
});

export const getMyBookings = catchAsyncError(async (req, res, next) => {
	const bookings = await Booking.find({ user: req.user._id })
		.populate({
			path: 'tour',
			select: '-__v -images -createdAt',
		})
		.select('-__v -user');
	res.status(200).json({
		status: 'success',
		message: 'User bookings',
		data: { bookings },
	});
});

export const getAllBookings = catchAsyncError(async (req, res, next) => {
	const bookings = await Booking.find({ tour: req.params.tourId })
		.populate({
			path: 'tour',
			select: '-__v -images -createdAt',
		})
		.populate({
			path: 'user',
			select: 'name photo',
		});
	res.status(200).json({
		status: 'success',
		message: 'User bookings',
		data: { bookings },
	});
});
