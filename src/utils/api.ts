import axios from "axios";
import { FormData } from "../utils/schema";

const apiUrl = "https://invoice-app-backend-dzk2.onrender.com";

const handleRequest = async <T,>(method: string, endpoint = "", data?: T) => {
  try {
    const response = await axios({ method, url: `${apiUrl}${endpoint}`, data });
    return response.data;
  } catch (err) {
    console.error(`Error with ${method.toUpperCase()} request:`, err);
    throw err;
  }
};

export const getInvoice = () => handleRequest("get");
export const addInvoice = (invoiceData: FormData) =>
  handleRequest("post", "", invoiceData);
export const updateInvoice = (id: string, invoiceData: FormData) =>
  handleRequest("put", `/${id}`, invoiceData);
export const updateInvoiceStatus = (id: string, invoiceStatus: string) =>
  handleRequest("put", `/${id}`, { invoiceStatus });
export const invoiceDeletion = (id: string) =>
  handleRequest("delete", `/${id}`);
