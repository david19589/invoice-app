type InvoiceItem = {
  "item-name": string;
  quantity: number;
  price: number;
};

export type Invoice = {
  "invoice-id": number;
  "item-name": string;
  "project-description": string;
  "street-address": string;
  city: string;
  "post-code": string;
  country: string;
  "invoice-date": string;
  "payment-due": string;
  "clients-name": string;
  "clients-street-address": string;
  "clients-city": string;
  "clients-post-code": string;
  "clients-country": string;
  "clients-email": string;
  items: InvoiceItem[];
  quantity: number;
  price: number;
};
