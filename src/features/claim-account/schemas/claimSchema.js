import { z } from "zod";

export const claimSchema = z
  .object({
    email: z
      .string()
      .email(
        "Email tidak valid"
      ),

    password: z
      .string()
      .min(
        8,
        "Minimal 8 karakter"
      ),

    password_confirmation:
      z.string(),
  })

  .refine(
    (data) =>
      data.password ===
      data.password_confirmation,
    {
      message:
        "Password tidak sama",
      path: [
        "password_confirmation",
      ],
    }
  );