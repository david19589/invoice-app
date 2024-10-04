export const getInvoiceStatus = (invoiceId: number) => {
  const savedStatuses = JSON.parse(localStorage.getItem("statuses") || "{}");
  return savedStatuses[invoiceId] || "pending";
};

export const setInvoiceStatus = (invoiceId: number, status: string) => {
  const savedStatuses = JSON.parse(localStorage.getItem("status") || "{}");
  savedStatuses[invoiceId] = status;
  localStorage.setItem("statuses", JSON.stringify(savedStatuses));
};
