import clsx from "clsx";
import { Link } from "react-router-dom";
import { Invoice } from "../models/invoice-types";
import arrow from "/src/assets/icon-arrow-right.svg";

interface statuses {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

function Invoices({
  darkMode,
  invoice,
  checked,
}: {
  darkMode: boolean;
  invoice: Invoice[];
  checked: statuses;
}) {
  const anyChecked = checked.draft || checked.pending || checked.paid;

  const filteredInvoices = anyChecked
    ? invoice.filter((inv) => {
        if (checked.draft && inv.invoice_status === "draft") return true;
        if (checked.pending && inv.invoice_status === "pending") return true;
        if (checked.paid && inv.invoice_status === "paid") return true;
        return false;
      })
    : invoice;

  return (
    <>
      {filteredInvoices.map((inv) => {
        const selectedInvoice = invoice.find((item) => item.id === inv.id);

        const invoiceDate = new Date(
          selectedInvoice?.invoice_date
            ? selectedInvoice.invoice_date
            : "No date available"
        );
        const paymentDueDate = new Date(invoiceDate);
        paymentDueDate.setDate(
          invoiceDate.getDate() + Number(selectedInvoice?.payment_terms)
        );

        const formattedPayment = paymentDueDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return (
          <div key={inv.id} className="max-w-[45.625rem] w-full">
            <Link to={`/invoice/${inv.id}`}>
              <div
                className={clsx(
                  darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
                  "md:flex md:gap-[3rem] p-[1.5rem] rounded-lg mb-[1rem] max-w-[45.625rem] w-full cursor-pointer"
                )}
              >
                <div className="md:gap-[2rem] md:mb-0 md:w-full md:max-w-max flex justify-between items-center mb-[1.5rem]">
                  <div className="flex">
                    <span className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#7E88C3]">
                      #
                    </span>
                    <h2
                      className={clsx(
                        darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      {inv.id.slice(0, 6)}
                    </h2>
                  </div>
                  <h3
                    className={clsx(
                      darkMode ? "text-[#FFF]" : "text-[#858BB2]",
                      "text-[0.813rem] leading-[1rem] tracking-[0.007rem] font-[500]"
                    )}
                  >
                    {inv.clients_name}
                  </h3>
                </div>
                <div className="flex justify-between w-full">
                  <div className="md:flex md:items-center md:gap-[4rem]">
                    <h3
                      className={clsx(
                        darkMode ? "text-[#FFF]" : "text-[#858BB2]",
                        "md:mb-0 text-[0.813rem] leading-[1rem] tracking-[0.007rem] font-[500] mb-[0.6rem]"
                      )}
                    >
                      Due {formattedPayment}
                    </h3>
                    <div>
                      <h2
                        className={clsx(
                          darkMode ? "text-[#FFF]" : "text-[#000]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                        )}
                      >
                        £
                        {selectedInvoice
                          ? selectedInvoice.price * selectedInvoice.quantity
                          : 0}
                      </h2>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      selectedInvoice?.invoice_status === "paid" &&
                        "bg-[#33d6a018]",
                      selectedInvoice?.invoice_status === "pending" &&
                        "bg-[#ff910018]",
                      selectedInvoice?.invoice_status === "draft" &&
                        (darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
                      "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
                    )}
                  >
                    <span
                      className={clsx(
                        selectedInvoice?.invoice_status === "paid" &&
                          "bg-[#33D69F]",
                        selectedInvoice?.invoice_status === "pending" &&
                          "bg-[#FF8F00]",
                        selectedInvoice?.invoice_status === "draft" &&
                          (darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                        "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
                      )}
                    ></span>
                    <h2
                      className={clsx(
                        selectedInvoice?.invoice_status === "paid" &&
                          "text-[#33D69F]",
                        selectedInvoice?.invoice_status === "pending" &&
                          "text-[#FF8F00]",
                        selectedInvoice?.invoice_status === "draft" &&
                          (darkMode ? "text-[#DFE3FA]" : "text-[#373B53]"),
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      {selectedInvoice?.invoice_status}
                    </h2>
                  </div>
                </div>
                <img
                  className="md:flex hidden self-center h-[0.7rem]"
                  src={arrow}
                  alt="arrow-right"
                />
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Invoices;
