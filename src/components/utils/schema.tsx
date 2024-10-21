import { z, ZodType } from "zod";

export type Item = {
  itemName: string;
  quantity: number;
  price: number;
};

export type FormData = {
  streetAddress?: string;
  city?: string;
  postCode?: string;
  country?: string;
  clientsName?: string;
  clientsEmail?: string;
  clientsStreetAddress?: string;
  clientsCity?: string;
  clientsPostCode?: string;
  clientsCountry?: string;
  invoiceDate?: string;
  paymentTerms?: string;
  projectDescription?: string;
  items?: Item[];
};

export const schema: ZodType<FormData> = z.object({
  streetAddress: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Invalid character.",
    }),

  city: z
    .string()
    .max(25, { message: "max 25 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  postCode: z
    .string()
    .max(10, { message: "max 10 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Invalid character.",
    }),

  country: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  clientsName: z
    .string()
    .max(25, { message: "max 25 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  clientsEmail: z
    .union([
      z
        .string()
        .max(48, { message: "max 48 char." })
        .email({ message: "Invalid email address." }),
      z.literal(""),
    ])
    .optional(),

  clientsStreetAddress: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Invalid character.",
    }),

  clientsCity: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  clientsPostCode: z
    .string()
    .max(10, { message: "max 10 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Invalid character.",
    }),

  clientsCountry: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  invoiceDate: z.string().optional(),

  paymentTerms: z.string().optional(),

  projectDescription: z
    .string()
    .max(40, { message: "max 40 char." })
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Invalid character.",
    }),

  items: z.array(
    z.object({
      itemName: z
        .string()
        .min(1, { message: "min 1 char." })
        .max(30, { message: "max 30 char." })
        .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

      quantity: z
        .number({ message: "invalid." })
        .min(1, { message: "min 1 num." })
        .max(9999, { message: "max 4 num." }),

      price: z
        .number({ message: "invalid." })
        .min(1, { message: "min 1 num." })
        .max(9999999, { message: "max 7 num." }),
    })
  ),
});
