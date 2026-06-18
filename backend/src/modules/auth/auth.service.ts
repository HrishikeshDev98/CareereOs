import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../lib/jwt";
import { AppError } from "../../middlewares/errorHandler";
import { RegisterInput, LoginInput } from "./auth.schema";
import { addDays } from "../../utils/date";

export const register = async (input: RegisterInput) => {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AppError(409, "Email already in use");

  const hashed = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: { email: input.email, password: hashed, firstName: input.firstName, lastName: input.lastName },
    select: { id: true, email: true, firstName: true, lastName: true },
  });

  return { message: "Account created successfully", user };
};

export const login = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) throw new AppError(401, "Invalid credentials");

  const payload = { userId: user.id };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: addDays(new Date(), 7) },
  });

  const { password: _, ...safeUser } = user;
  return { user: safeUser, accessToken, refreshToken };
};

export const refresh = async (token: string) => {
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.expiresAt < new Date()) throw new AppError(401, "Invalid or expired refresh token");

  const payload = verifyRefreshToken(token);
  const accessToken = signAccessToken({ userId: payload.userId });

  return { accessToken };
};

export const logout = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
};
