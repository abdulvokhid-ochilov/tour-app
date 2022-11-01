import crypto from 'crypto';
import { promisify } from 'util';
import Users from '../Models/user.model.js';
import catchAsyncError from '../Utils/catchAsyncError.js';
import CustomError from '../Utils/CustomError.js';
import { jwtSign, jwtVerify } from '../Utils/jwt.js';
import sendEmail from '../Utils/email.js';

export const signup = catchAsyncError(async (req, res, next) => {
	const { name, email, password, photo, role } = req.body;
	const user = await Users.create({ name, email, password, photo, role });
	const token = await jwtSign(user._id);
	user.pwdChangedAt = undefined;
	user.password = undefined;
	res.status(201).json({
		status: 'success',
		message: 'Signed up',
		token,
		data: { user },
	});
});

export const login = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password)
		return next(new CustomError('Please provide email and password', 400));
	const user = await Users.findOne({ email }).select('+password');
	if (!user || !(await user.isCorrectPwd(password, user.password)))
		return next(
			new CustomError('You provided wrong email or password!', 400)
		);
	const token = await jwtSign(user._id);
	user.pwdChangedAt = undefined;
	user.password = undefined;
	res.status(200).json({
		status: 'success',
		message: 'Logged in',
		token,
		data: { user },
	});
});

export const verifyLogin = catchAsyncError(async (req, res, next) => {
	const { authorization } = req.headers;
	let token;
	if (authorization && authorization.startsWith('Bearer'))
		token = authorization.split(' ')[1];
	if (!token)
		return next(
			new CustomError('You are not logged in! Please log in first.', 401)
		);
	const decoded = await jwtVerify(token);
	const user = await Users.findById(decoded.id).select('+pwdChangedAt');
	if (!user)
		return next(new CustomError('The user does not longer exist!', 401));
	if (Date.parse(user.pwdChangedAt) / 1000 > decoded.iat) {
		return next(new CustomError('Please login again!', 401));
	}
	user.pwdChangedAt = undefined;
	req.user = user;
	next();
});

export const verifyRole = (role) => {
	return (req, res, next) => {
		if (role != req.user.role) {
			return next(
				new CustomError('You dont have access to this route!', 401)
			);
		}
		next();
	};
};

export const updatePassword = catchAsyncError(async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword)
		return next(
			new CustomError('Please provide old and new password', 400)
		);
	const user = await Users.findById(req.user._id).select('+password');
	if (!(await user.isCorrectPwd(oldPassword, user.password)))
		return next(new CustomError('Your password is not correct!', 400));
	user.password = newPassword;
	await user.save();
	const token = await jwtSign(user._id);
	user.pwdChangedAt = undefined;
	user.password = undefined;
	res.status(200).json({
		status: 'success',
		message: 'Password updated',
		token,
		data: { user },
	});
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await Users.findOne({ email: req.body.email });
	if (!user)
		return next(new CustomError('There is no user with this email!', 404));
	//2. generate token
	const randomBytes = (await promisify(crypto.randomBytes)(32)).toString(
		'hex'
	);
	const tempToken = crypto
		.createHash('sha256')
		.update(randomBytes)
		.digest('hex');
	user.tempToken = tempToken;
	user.tempTokenExp = Date.now() + 600000;
	await user.save({ validateBeforeSave: false });
	const url = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/reset-password/${randomBytes}`;
	const info = await sendEmail(user.email, url);
	if (!info.response.startsWith('250')) {
		user.tempToken = null;
		user.tempTokenExp = null;
		await user.save({ validateBeforeSave: false });
		return next(
			new CustomError(
				'There was an error send email.Please try later!',
				500
			)
		);
	}
	res.status(200).json({
		status: 'success',
		message: 'Resent password link has been sent to your email!',
		data: randomBytes,
	});
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
	const tempToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');
	const user = await Users.findOne({
		tempToken,
		tempTokenExp: { $gt: Date.now() },
	});
	if (!user)
		return next(new CustomError('Invalid token! or has expired!', 400));
	user.password = req.body.password;
	user.tempToken = undefined;
	user.tempTokenExp = undefined;
	await user.save();
	user.pwdChangedAt = undefined;
	user.password = undefined;
	const token = await jwtSign(user._id);
	res.status(200).json({
		status: 'success',
		message: 'Password updated',
		token,
		data: { user },
	});
});
