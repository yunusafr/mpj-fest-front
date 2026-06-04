import { z } from "zod";

export const niamSchema = z.object({
  niam: z
    .string()
    .min(5, "NIAM wajib diisi"),
});