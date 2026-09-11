"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterResult =
  | { ok: true }
  | { ok: false; error: string };

export async function registerAction(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the details and try again." };
  }

  const { firstName, lastName, email, phone, password } = parsed.data;
  const normalised = email.toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email: normalised },
  });
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`.trim(),
      email: normalised,
      phone,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  return { ok: true };
}