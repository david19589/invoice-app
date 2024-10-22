import { updateInvoiceStatus } from "./api";

export const handleChangeStatus = async (
  id: string,
  newStatus: string,
  setStatus: (status: string) => void
) => {
  try {
    await updateInvoiceStatus(id, newStatus);
    setStatus(newStatus);
  } catch (err) {
    console.error("Error updating invoice status:", err);
  }
};
