import { config } from 'dotenv';
import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
	console.log('Uncaught exception! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

import app from './app.js';

config({
	path: './config.env',
});

const pw = encodeURIComponent(process.env.DBPWD);
const url = process.env.DBURL.replace('<password>', pw);

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log('DB is connected');
	})
	.catch((err) => {
		console.log(err.name, err.message);
	});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`THE API IS RUNNING ON PORT ${port}`);
});

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! Shutting down...');
	server.close(() => {
		process.exit(1);
	});
});
