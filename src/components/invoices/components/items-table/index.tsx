import clsx from "clsx";
import { Invoice } from "../../../utils/invoice-types";

function ItemsTable(props: {
  darkMode: boolean;
  invoice: Invoice[];
  selectedInvoice: Invoice;
}) {
  console.log(props.invoice);
  return (
    <>
      
        <div
          className="flex items-center justify-between mb-[1.5rem]"
        >
          <div>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#000]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem]"
              )}
            >
              {props.selectedInvoice["item-name"]}
            </h2>
            <div className="flex items-baseline gap-[0.3rem]">
              <h2
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                )}
              >
                {props.selectedInvoice.quantity}
              </h2>
              <span
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                )}
              >
                x
              </span>
              <h2
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                )}
              >
                £{props.selectedInvoice.price}
              </h2>
            </div>
          </div>
          <h2
            className={clsx(
              props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
              "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
            )}
          >
            £{props.selectedInvoice.quantity * props.selectedInvoice.price}
          </h2>
        </div>
    </>
  );
}

export default ItemsTable;
