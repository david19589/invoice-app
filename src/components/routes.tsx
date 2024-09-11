import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Details from "./invoices/components/details";
import { useEffect, useState } from "react";
import { Invoice } from "./utils/invoice-types";
import { getInvoice } from "./utils/api";

function PageRoutes(props: { darkMode: boolean }) {
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoice();
        setInvoice(data);
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
          <Home darkMode={props.darkMode} invoice={invoice} status={status} />
        }
      />
      <Route
        path="/invoice/:id"
        element={
          <Details
            darkMode={props.darkMode}
            invoice={invoice}
            status={status}
          />
        }
      />
    </Routes>
  );
}

export default PageRoutes;
