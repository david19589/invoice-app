import axios from "axios";
import { Invoice } from "../utils/invoice-types";

const apiUrl = "http://localhost:5000/inv";

const handleRequest = async <T,>(method: string, endpoint = "", data?: T) => {
  console.log("Sending invoice data to API:", data);
  try {
    const response = await axios({ method, url: `${apiUrl}${endpoint}`, data });
    return response.data;
  } catch (err) {
    console.error(`Error with ${method.toUpperCase()} request:`, err);
    throw err;
  }
};

export const getInvoice = () => handleRequest("get");
export const getItems = () => handleRequest("get", "/items");
export const addInvoice = (invoiceData: Invoice) =>
  handleRequest("post", "", invoiceData);
export const updateInvoice = (id: number, invoiceData: Invoice) =>
  handleRequest("put", `/${id}`, invoiceData);
export const deleteInvoice = (id: number) => handleRequest("delete", `/${id}`);
