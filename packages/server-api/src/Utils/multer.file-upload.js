import multer from 'multer';
import CustomError from './CustomError.js';

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new CustomError('Please upload only image files', 400));
	}
};
const storage = multer.memoryStorage();

const upload = multer({
	limits: { fileSize: 1048576 * 10 },
	fileFilter,
	storage,
});

export const multerForUsers = upload.single('photo');
export const multerForTours = upload.fields([
	{ name: 'imageCover', maxCount: 1 },
	{ name: 'images', maxCount: 4 },
]);
