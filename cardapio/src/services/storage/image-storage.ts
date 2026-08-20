import { getCloudinary } from "@/lib/cloudinary";
import type { ImageFolder } from "@/validations/image.validation";

export type UploadedImage = {
  url: string;
  publicId: string;
};

export type UploadImageOptions = {
  folder: ImageFolder;
};

export async function uploadImage(
  buffer: Buffer,
  options: UploadImageOptions,
): Promise<UploadedImage> {
  const cloudinary = getCloudinary();

  const result = await new Promise<UploadedImage>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Upload Cloudinary retornou resposta vazia"));
          return;
        }

        resolve({
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        });
      },
    );

    uploadStream.end(buffer);
  });

  return result;
}

export async function deleteImage(publicId: string): Promise<void> {
  const cloudinary = getCloudinary();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
