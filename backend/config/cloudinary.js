const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary using env vars
// Note: User needs to add these to their .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
});

const uploadStream = (buffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `studyhub/${folderName}`, resource_type: 'auto' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = {
  cloudinary,
  uploadStream,
};
