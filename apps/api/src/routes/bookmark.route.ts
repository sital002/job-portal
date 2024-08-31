import { Router } from "express";
import { addToBookmark, getBookmarks, removeFromBookmark } from "../controller/bookmark.controller";
import { authenticate } from "../middleware/authenticate";
const bookmarkRouter = Router();

bookmarkRouter.route("/new").post(authenticate, addToBookmark);
bookmarkRouter.route("/").get(authenticate, getBookmarks);
bookmarkRouter.route("/:jobId").delete(authenticate, removeFromBookmark);
export default bookmarkRouter;
