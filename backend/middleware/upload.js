import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    return cb(new Error("Only .jpg, .jpeg and .png files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
