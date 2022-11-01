import {
	S3Client,
	PutObjectCommand,
	DeleteObjectsCommand,
	ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';
export default class S3Bucket {
	constructor() {
		this.bucketName = process.env.S3_BUCKET_NAME;
		this.bucketRegion = process.env.S3_BUCKET_REGION;
		this.client = new S3Client({
			region: this.bucketRegion,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
			},
		});
	}
	async editImage(image) {
		return await sharp(image).webp({ lossless: true }).toBuffer();
	}

	async uploadImage(Key, Body) {
		const params = {
			Bucket: this.bucketName,
			Key: `${Key}.webp`,
			Body,
			ACL: 'public-read',
			ContentType: 'image/webp',
		};
		const command = new PutObjectCommand(params);
		return await this.client.send(command);
	}

	async getImageUrl(name, image) {
		const result = await this.uploadImage(
			name,
			await this.editImage(image)
		);
		if (result.$metadata.httpStatusCode === 200)
			return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com/${name}.webp`;
	}

	async deleteImage(dir) {
		const deleteParams = {
			Bucket: this.bucketName,
			Delete: { Objects: [] },
		};
		const listParams = {
			Bucket: this.bucketName,
			Prefix: dir,
		};
		const listCommand = new ListObjectsV2Command(listParams);
		const listedObjects = await this.client.send(listCommand);
		if (!listedObjects.Contents) return;
		listedObjects.Contents.forEach(({ Key }) => {
			deleteParams.Delete.Objects.push({ Key });
		});
		const deleteCommand = new DeleteObjectsCommand(deleteParams);
		return await this.client.send(deleteCommand);
	}
}
