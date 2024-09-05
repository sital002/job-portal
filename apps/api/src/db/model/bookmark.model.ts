import mongoose, { model, Schema } from "mongoose";

export interface IBookmark extends mongoose.Document {
  user: Schema.Types.ObjectId;
  job: Schema.Types.ObjectId;
}
const bookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "UserId is required"] },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: [true, "JobId is required"] },
  },
  { timestamps: true },
);

const BookmarkModel = model<IBookmark>("Bookmark", bookmarkSchema);
export default BookmarkModel;
