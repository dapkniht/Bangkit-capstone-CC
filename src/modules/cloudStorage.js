const { Storage } = require("@google-cloud/storage");
const os = require("os");

const storage = new Storage();

const cloudStorage = {};

cloudStorage.uploadImage = (filename, bucketName) => {
  const uploadedImage = storage
    .bucket(bucketName)
    .upload(`${os.tmpdir()}/${filename}`, {
      destination: filename,
      overwrite: true,
    })
    .then(() => {
      filename = filename.replace(/ /g, "%20");
      return `https://storage.googleapis.com/${bucketName}/${filename}`;
    })
    .catch((error) => {
      return new Error(error);
    });
  return uploadedImage;
};

cloudStorage.deleteImage = (filename, bucketName) => {
  return storage
    .bucket(bucketName)
    .file(filename)
    .delete()
    .then(() => {
      return "sukses";
    })
    .catch((error) => {
      return new Error(error);
    });
};

cloudStorage.deleteMultipleImage = async (filesname, bucketName) => {
  try {
    for (let filename of filesname) {
      await storage.bucket(bucketName).file(filename).delete();
    }
  } catch (error) {
    return new Error(error);
  }
};

module.exports = cloudStorage;
