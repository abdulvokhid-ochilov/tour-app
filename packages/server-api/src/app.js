import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import tourRouter from './Routes/tour.routes.js';
import userRouter from './Routes/user.routes.js';
import bookingRouter from './Routes/booking.routes.js';
import reviewRouter from './Routes/review.routes.js';
import CustomError from './Utils/CustomError.js';
import errorController from './Controllers/error.controller.js';
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(xssClean());
app.use(ExpressMongoSanitize());
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 101,
});
app.use(limiter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('*', (req, res, next) => {
	next(new CustomError('No such route on this server!', 404));
});
app.use(errorController);
export default app;
