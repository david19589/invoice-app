import clsx from "clsx";
import { Link } from "react-router-dom";
import { Invoice, InvoiceItem } from "../utils/invoice-types";

function Invoices({
  darkMode,
  invoice,
  status,
  items,
  formattedPayment,
}: {
  darkMode: boolean;
  invoice: Invoice[];
  status: string;
  items: InvoiceItem[];
  formattedPayment: string;
}) {
  return (
    <>
      {invoice.map((inv) => {
        const filteredItems = items.filter(
          (item) => item.item_id === inv.invoice_id
        );
        return (
          <div key={inv.invoice_id} className="max-w-[45.625rem] w-full">
            <Link to={`/invoice/${inv.invoice_id}`}>
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
                      {inv.invoice_id}
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
                      {filteredItems.map((item) => (
                        <h2
                          key={item.item_id}
                          className={clsx(
                            darkMode ? "text-[#FFF]" : "text-[#000]",
                            "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                          )}
                        >
                          £ {item.price * item.quantity}
                        </h2>
                      ))}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      status === "paid" && "bg-[#33d6a018]",
                      status === "pending" && "bg-[#ff910018]",
                      status === "draft" &&
                        (darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
                      "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
                    )}
                  >
                    <span
                      className={clsx(
                        status === "paid" && "bg-[#33D69F]",
                        status === "pending" && "bg-[#FF8F00]",
                        status === "draft" &&
                          (darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                        "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
                      )}
                    ></span>
                    <h2
                      className={clsx(
                        status === "paid" && "text-[#33D69F]",
                        status === "pending" && "text-[#FF8F00]",
                        status === "draft" &&
                          (darkMode ? "text-[#DFE3FA]" : "text-[#373B53]"),
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      {status}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Invoices;
