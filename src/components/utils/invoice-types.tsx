export type InvoiceItem = {
  item_id: number;
  item_name: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  invoice_id: number;
  invoice_date: string;
  payment_terms: string;
  project_description: string;
  item_name: string;
  street_address: string;
  city: string;
  post_code: string;
  country: string;
  clients_name: string;
  clients_email: string;
  clients_street_address: string;
  clients_city: string;
  clients_post_code: string;
  clients_country: string;
  quantity: number;
  price: number;
};
