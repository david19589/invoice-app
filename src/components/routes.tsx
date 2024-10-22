import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Details from "./invoices/components/details";
import { useEffect, useState } from "react";
import { Invoice } from "./models/invoice-types";
import { getInvoice } from ".././utils/api";

function PageRoutes(props: { darkMode: boolean }) {
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [netDays, setNetDays] = useState<number | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceData = await getInvoice();
        setInvoice(invoiceData);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
      }
    };
    fetchInvoice();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            darkMode={props.darkMode}
            invoice={invoice}
            setInvoice={setInvoice}
            netDays={netDays}
            setNetDays={setNetDays}
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
            netDays={netDays}
            setNetDays={setNetDays}
          />
        }
      />
    </Routes>
  );
}

export default PageRoutes;
