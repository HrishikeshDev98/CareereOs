import { prisma } from "../../lib/prisma";
import { cloudinary } from "../../lib/cloudinary";
import { AppError } from "../../middlewares/errorHandler";
import { UpdateProfileInput } from "./users.schema";

const safeUserSelect = {
  id: true,
  email: true,
  role: true,
  firstName: true,
  lastName: true,
  avatarUrl: true,
  bio: true,
  resumeUrl: true,
  phone: true,
  location: true,
  linkedinUrl: true,
  portfolioUrl: true,
  isVerified: true,
  createdAt: true,
} as const;

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: safeUserSelect });
  if (!user) throw new AppError(404, "User not found");
  return user;
};

export const updateProfile = async (userId: string, input: UpdateProfileInput) => {
  return prisma.user.update({
    where: { id: userId },
    data: input,
    select: safeUserSelect,
  });
};

export const uploadAvatar = async (userId: string, fileBuffer: Buffer, mimetype: string) => {
  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "careeros/avatars", resource_type: "image", transformation: [{ width: 400, height: 400, crop: "fill" }] },
      (err, result) => (err || !result ? reject(err) : resolve(result))
    );
    stream.end(fileBuffer);
  });

  return prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: result.secure_url },
    select: safeUserSelect,
  });
};

export const uploadResume = async (userId: string, fileBuffer: Buffer) => {
  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "careeros/resumes", resource_type: "raw", format: "pdf" },
      (err, result) => (err || !result ? reject(err) : resolve(result))
    );
    stream.end(fileBuffer);
  });

  return prisma.user.update({
    where: { id: userId },
    data: { resumeUrl: result.secure_url },
    select: safeUserSelect,
  });
};

export const deleteAccount = async (userId: string) => {
  await prisma.user.delete({ where: { id: userId } });
};
