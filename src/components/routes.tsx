import Home from "./home";
import { Route, Routes, useParams } from "react-router-dom";
import Details from "./invoices/components/details";
import { useEffect, useState } from "react";
import { Invoice, InvoiceItem } from "./utils/invoice-types";
import { getInvoice, getItems } from "./utils/api";
import {
  getInvoiceStatus,
  setInvoiceStatus,
} from "../components/utils/local-storage-helpers";

function PageRoutes(props: { darkMode: boolean }) {
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const storedDate = localStorage.getItem("startDate");
    return storedDate ? new Date(storedDate) : null;
  });

  const { id } = useParams();
  const invoiceIdNumber = Number(id);

  const invoiceItem = invoice.find((item) => item.invoice_id);
  const invoiceId = invoiceItem ? invoiceItem.invoice_id : null;

  const [status, setStatus] = useState(() => {
    return invoiceId ? getInvoiceStatus(invoiceId) : "pending";
  });

  useEffect(() => {
    if (invoiceId !== null) {
      setInvoiceStatus(invoiceId, status);
    }
  }, [status, invoiceId]);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceData = await getInvoice();
        const itemsData = await getItems();
        setInvoice(invoiceData);
        setItems(itemsData);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      }
    };
    fetchInvoice();
  }, []);

  const [netDays, setNetDays] = useState(30);

  const selectedInvoice = invoice.find(
    (item) => item.invoice_id === invoiceIdNumber
  );

  const invoiceDate = new Date(selectedInvoice?.invoice_date || Date.now());
  const paymentDueDate = new Date(invoiceDate);
  paymentDueDate.setDate(invoiceDate.getDate() + netDays);

  const formattedPayment = paymentDueDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            darkMode={props.darkMode}
            invoice={invoice}
            setInvoice={setInvoice}
            setItems={setItems}
            status={status}
            setStatus={setStatus}
            items={items}
            netDays={netDays}
            setNetDays={setNetDays}
            formattedPayment={formattedPayment}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        }
      />
      <Route
        path="/invoice/:id"
        element={
          <Details
            darkMode={props.darkMode}
            invoice={invoice}
            setInvoice={setInvoice}
            setItems={setItems}
            status={status}
            setStatus={setStatus}
            items={items}
            netDays={netDays}
            setNetDays={setNetDays}
            formattedPayment={formattedPayment}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        }
      />
    </Routes>
  );
}

export default PageRoutes;
