import User from '../Models/user.model.js';
import Booking from '../Models/booking.model.js';
import catchAsyncError from '../Utils/catchAsyncError.js';
import S3 from '../Utils/S3Bucket.js';
import Review from '../Models/review.model.js';

export const getProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) return next(new CustomError('User is not found!', 404));
	res.status(200).json({
		status: 'success',
		message: 'User',
		data: { user },
	});
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
	const { body, file } = req;
	const prohibited = ['password', 'role', 'pwdChangedAt'];
	prohibited.forEach((el) => {
		if (body[el]) delete body[el];
	});
	if (file) {
		const path = `User/${req.user._id}/img`;
		const image = file.buffer;
		const s3 = new S3();
		body.photo = await s3.getImageUrl(path, image);
	}
	if (body.photo === 'undefined' || body.photo === 'null') {
		body.photo =
			'https://natours-storage.s3.ap-northeast-2.amazonaws.com/User/images/avatar.webp';
	}
	const user = await User.findByIdAndUpdate(req.user._id, body, {
		runValidators: true,
		new: true,
	});
	res.status(200).json({
		status: 'success',
		message: 'User updated',
		data: { user },
	});
});

export const deleteProfile = catchAsyncError(async (req, res, next) => {
	const deletedUser = await User.findByIdAndDelete(req.user._id);
	if (!deletedUser) return next(new CustomError('User is not found!', 404));
	await Booking.deleteMany({ user: req.user._id });
	await Review.deleteMany({ user: req.user._id });
	const s3 = new S3();
	await s3.deleteImage(`User/${req.user._id}`);
	res.status(200).json({
		status: 'SUCCESS',
		message: 'Profile deleted!',
		data: null,
	});
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
	const users = await User.find({ role: 'user' });
	res.status(200).json({
		status: 'success',
		message: 'All users',
		data: { users },
	});
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
	const deletedUser = await User.findByIdAndDelete(req.params.userId);
	if (!deleteUser) return next(new CustomError('User is not found!', 404));
	await Booking.deleteMany({ user: deletedUser._id });
	await Review.deleteMany({ user: deletedUser._id });
	const s3 = new S3();
	await s3.deleteImage(`User/${req.user._id}`);
	await res.status(200).json({
		status: 'success',
		message: 'User deleted',
		data: null,
	});
});
