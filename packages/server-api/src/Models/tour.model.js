import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A tour must have a name'],
			unique: true,
			trim: true,
		},
		duration: {
			type: Number,
			required: [true, 'A tour must have a duration'],
		},
		maxGroupSize: {
			type: Number,
			required: [true, 'A tour must have a group size'],
		},
		difficulty: {
			type: String,
			required: [true, 'A tour must have a difficulty'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Difficulty is either: easy, medium, difficult',
			},
		},
		ratingsAverage: {
			type: Number,
			min: [1, 'Rating must be above 1'],
			max: [5, 'Rating must be below 5'],
		},
		ratingsQuantity: Number,
		price: {
			type: Number,
			required: [true, 'A tour must have a price'],
		},
		summary: {
			type: String,
			trim: true,
			required: [true, 'A tour must have a description'],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, 'A tour must have a cover image'],
		},
		images: [String],
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
		startDates: {
			type: Date,
			required: [true, 'A tour must have a start date'],
		},
		location: {
			place: String,
			lat: String,
			lng: String,
		},
		stops: [Object],
		stops: [Object],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

export default mongoose.model('Tour', tourSchema);
