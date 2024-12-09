import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const petFormClientSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100),
  image: z.union([
    z.literal(""),
    z
      .custom<FileList>()
      .refine((files) => {
        return Array.from(files ?? []).every(
          (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
        );
      }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
      .refine((files) => {
        return Array.from(files ?? []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        );
      }, "File type is not supported"),
  ]),
  age: z.coerce
    .number({ message: "Age must be a positive number" })
    .int()
    .positive()
    .max(99999),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export const petFormServerSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100),
  image: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image url must be a valid url" }),
  ]),
  age: z.coerce
    .number({ message: "Age must be a positive number" })
    .int()
    .positive()
    .max(99999),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});
export const petIdSchema = z.string().cuid();
