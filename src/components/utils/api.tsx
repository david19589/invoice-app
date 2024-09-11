import axios from "axios";

export const getInvoice = async () => {
  try {
    const response = await axios.get("http://localhost:5000/inv");
    return response.data;
  } catch (err) {
    console.error("Error fetching invoices:", err);
    throw err;
  }
};

export const addInvoice = async () => {
  try {
    const response = await axios.post("http://localhost:5000/inv");
    return response.data;
  } catch (err) {
    console.error("Error adding invoice:", err);
    throw err;
  }
};

export const deleteInvoice = async () => {
  try {
    const response = await axios.delete("http://localhost:5000/inv");
    return response.data;
  } catch (err) {
    console.error("Error deleting invoice:", err);
    throw err;
  }
};