import clsx from "clsx";
import { Invoice, InvoiceItem } from "../../../utils/invoice-types";

function ItemsTable(props: {
  darkMode: boolean;
  selectedInvoice: Invoice;
  selectedItem: InvoiceItem;
}) {
  const total = props.selectedItem.quantity * props.selectedItem.price;

  return (
    <div
      className={clsx(
        props.darkMode ? "bg-[#252945]" : "bg-[#F9FAFE]",
        "rounded-lg"
      )}
    >
      <div className="flex items-center justify-between mb-[1.5rem] p-[1.5rem]">
        <div>
          <h2
            className={clsx(
              props.darkMode ? "text-[#FFF]" : "text-[#000]",
              "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem] break-all"
            )}
          >
            {props.selectedItem.item_name}
          </h2>
          <div className="flex items-baseline gap-[0.3rem]">
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
              )}
            >
              {props.selectedItem.quantity}
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
              £{props.selectedItem.price}
            </h2>
          </div>
        </div>
        <h2
          className={clsx(
            props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
            "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-all"
          )}
        >
          £{total}
        </h2>
      </div>
      <div
        className={clsx(
          props.darkMode ? "bg-[#0C0E16]" : "bg-[#373B53]",
          "p-[1.5rem] rounded-b-lg flex justify-between items-center"
        )}
      >
        <h2 className="text-[0.8rem] leading-[1.1rem] tracking-[-0.00625rem] font-[500] text-[#FFF]">
          Grand Total
        </h2>
        <h2 className="text-[1.5rem] leading-[2rem] tracking-[-0.032rem] font-[700] text-[#FFF] break-all">
          £{total}
        </h2>
      </div>
    </div>
  );
}

export default ItemsTable;
