import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

export async function uploadFile(filePath: string, folder: string): Promise<{ error: any; result: any }> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "job-portal/" + folder,
    });
    unlinkSync(filePath);
    return { error: null, result };
  } catch (error) {
    unlinkSync(filePath);
    return { error, result: null };
  }
}
