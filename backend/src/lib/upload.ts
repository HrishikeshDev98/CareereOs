import multer from "multer";
import { AppError } from "../middlewares/errorHandler";

const imageFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new AppError(400, "Only image files are allowed"));
  }
  cb(null, true);
};

const pdfFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new AppError(400, "Only PDF files are allowed"));
  }
  cb(null, true);
};

export const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: imageFilter,
});

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: pdfFilter,
});
