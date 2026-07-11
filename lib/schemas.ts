import { z } from "zod";

export const dayScheduleSchema = z
  .object({
    open: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().optional(),
  })
  .optional();

export const scheduleSchema = z.object({
  monday: dayScheduleSchema,
  tuesday: dayScheduleSchema,
  wednesday: dayScheduleSchema,
  thursday: dayScheduleSchema,
  friday: dayScheduleSchema,
  saturday: dayScheduleSchema,
  sunday: dayScheduleSchema,
});

export const contactSchema = z.object({
  phone: z.string().min(1, "El teléfono es obligatorio"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  whatsapp: z.string().min(1, "El WhatsApp es obligatorio"),
});

export const locationSchema = z.object({
  address: z.string().min(1, "La dirección es obligatoria"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  mapUrl: z.string().optional().or(z.literal("")),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  price: z.string().optional().or(z.literal("")),
  image: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  category: z.string().min(1, "La categoría del producto es obligatoria"),
});

export const socialSchema = z.object({
  instagram: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
});

export const businessFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),
  category: z.string().min(1, "La categoría es obligatoria"),
  subcategory: z.string().optional().or(z.literal("")),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  shortDescription: z.string().min(5, "Mínimo 5 caracteres"),
  story: z.string().min(10, "Mínimo 10 caracteres"),
  image: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  images: z.array(z.string().url("Debe ser una URL válida")),
  logo: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
  featured: z.boolean(),
  premium: z.boolean(),
  schedule: scheduleSchema,
  contact: contactSchema,
  location: locationSchema,
  products: z.array(productSchema),
  tags: z.array(z.string()),
  established: z.coerce.number().optional().or(z.literal("")),
  social: socialSchema,
  videoUrl: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
});

export type BusinessFormValues = z.infer<typeof businessFormSchema>;
