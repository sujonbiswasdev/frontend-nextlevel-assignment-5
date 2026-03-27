import { z } from "zod";
export const allowedDomains = [
  "res.cloudinary.com",
  "images.pexels.com",
];


export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  image: z
  .string()
  .url("Invalid image URL")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return allowedDomains.includes(parsed.hostname);
      } catch {
        return false;
      }
    },
    {
      message: "Only Cloudinary and Pexels images allowed",
    },
  )
  .optional(),
}).strict();