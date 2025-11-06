import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extention = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + file.fieldname + extention;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Format Image tidak sesuai!");
    error.status = 400;

    cb(error, false);
  }
};

export const upload = multer({ storage, fileFilter });
