import jwt from 'jsonwebtoken';

export const jwtSign = (id) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ id: id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRATION },
			(err, token) => {
				if (err) return reject(err);
				else return resolve(token);
			}
		);
	});
};

export const jwtVerify = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return reject(err);
			else return resolve(decoded);
		});
	});
};
