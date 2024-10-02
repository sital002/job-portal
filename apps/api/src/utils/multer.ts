import multer from "multer";
import { ApiError } from "./ApiError";

const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const upload = multer({
  dest: "./uploads",
  fileFilter: (_req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Invalid file type. Only PDF, DOC, DOCX allowed"));
    }
  },
});

export default upload;
