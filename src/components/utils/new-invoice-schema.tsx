import { z, ZodType } from "zod";

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
  itemName?: string;
  quantity?: number;
  price?: number;
};

export const schema: ZodType<FormData> = z.object({
  streetAddress: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "Invalid character." }),

  city: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(25, { message: "max 25 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

  postCode: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(10, { message: "max 10 char." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "Invalid character." }),

  country: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

  clientsName: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(25, { message: "max 25 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

  clientsEmail: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(48, { message: "max 48 char." })
    .email({ message: "Invalid email address." }),

  clientsStreetAddress: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "Invalid character." }),

  clientsCity: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

  clientsPostCode: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(10, { message: "max 10 char." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "Invalid character." }),

  clientsCountry: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

  invoiceDate: z.string().optional(),

  paymentTerms: z.string().nonempty("required"),

  projectDescription: z
    .string()
    .min(1, { message: "min 1 char." })
    .max(40, { message: "max 40 char." })
    .regex(/^[A-Za-z ]+$/, { message: "Invalid character." }),

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
});
