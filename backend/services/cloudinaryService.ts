import cloudinary from "../config/cloudinary";

export const uploadImage = async (fileBuffer: Buffer, folder: string = "products"): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject(new Error("Unknown Cloudinary error"));
        }
      }
    );

    stream.end(fileBuffer);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    // Continue even if delete fails to avoid breaking application flow
  }
};
