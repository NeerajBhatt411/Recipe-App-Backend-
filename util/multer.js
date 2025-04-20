const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("./cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req, file) => {
        return file.originalname.split(".")[0] + "-" + Date.now();
    }
  }
});

const upload = multer({ storage });

module.exports = upload; // CommonJS export syntax
