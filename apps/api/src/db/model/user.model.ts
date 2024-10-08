import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "RECRUITER";
  emailVerified: boolean;
  profileUrl?: string;
  displayName: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  verificationToken: string;
  bookmarks: [mongoose.Types.ObjectId];
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [64, "Password must be at most 64 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "RECRUITER"],
      required: true,
      default: "USER",
    },
    profileUrl: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    displayName: {
      type: String,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [64, "Name name must be at most 64 characters long"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token is required"],
    },

    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookmark",
      },
    ],
  },

  { timestamps: true },
);

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    },
  );
  return token;
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    },
  );
  return token;
};

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
