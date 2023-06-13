const { Storage } = require("@google-cloud/storage");
const os = require("os");

const storage = new Storage();

const imageToBucket = (filename, bucketName) => {
  const uploadedImage = storage
    .bucket(bucketName)
    .upload(`${os.tmpdir()}/${filename}`, {
      destination: filename,
      overwrite: true,
    })
    .then(() => {
      return `https://storage.googleapis.com/${bucketName}/${filename}`;
    })
    .catch((error) => {
      return new Error(error);
    });
  return uploadedImage;
};

module.exports = imageToBucket;
