import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
  .any()
  .refine((files) => files?.length == 1, "Image is required.")
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );

export const ninSchema = z.object({
  nin: z.string().length(11, { message: "NIN must be 11 digits" }).regex(/^\d+$/, { message: "NIN must only contain digits" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  image: fileSchema,
});

export const bvnSchema = z.object({
  bvn: z.string().length(11, { message: "BVN must be 11 digits" }).regex(/^\d+$/, { message: "BVN must only contain digits" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
});

export const passportSchema = z.object({
  passport: fileSchema,
});

export const driversLicenseSchema = z.object({
  license: fileSchema,
});

export const votersCardSchema = z.object({
  voters: fileSchema,
});

export type NINSchema = z.infer<typeof ninSchema>;
export type BVNSchema = z.infer<typeof bvnSchema>;
export type PassportSchema = z.infer<typeof passportSchema>;
export type DriversLicenseSchema = z.infer<typeof driversLicenseSchema>;
export type VotersCardSchema = z.infer<typeof votersCardSchema>;