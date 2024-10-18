import clsx from "clsx";
import { Invoice } from "../../../models/invoice-types";

function ItemsTable(props: { darkMode: boolean; selectedInvoice: Invoice }) {
  const total = props.selectedInvoice.quantity * props.selectedInvoice.price;

  return (
    <div
      className={clsx(
        props.darkMode ? "bg-[#252945]" : "bg-[#F9FAFE]",
        "rounded-lg"
      )}
    >
      <div className="md:hidden">
        <div className="flex items-center justify-between p-[1.5rem]">
          <div>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#000]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem] break-all"
              )}
            >
              {props.selectedInvoice.item_name}
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
              props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
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
          <h2 className="md:hidden text-[0.8rem] leading-[1.1rem] tracking-[-0.00625rem] font-[500] text-[#FFF]">
            Grand Total
          </h2>
          <h2 className="md:flex hidden text-[0.8rem] leading-[1.1rem] tracking-[-0.00625rem] font-[500] text-[#FFF]">
            Amount Due
          </h2>
          <h2 className="text-[1.5rem] leading-[2rem] tracking-[-0.032rem] font-[700] text-[#FFF] break-all">
            £{total}
          </h2>
        </div>
      </div>
      <div className="md:flex hidden items-center justify-between p-[1.5rem]">
        <div className="flex flex-col gap-[2rem]">
          <h3
            className={clsx(
              props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
              "text-[0.8rem] leading-[1.1rem] tracking-[-0.0125rem] "
            )}
          >
            Item Name
          </h3>
          <h2
            className={clsx(
              props.darkMode ? "text-[#FFF]" : "text-[#000]",
              "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem] break-all"
            )}
          >
            {props.selectedInvoice.item_name}
          </h2>
        </div>
        <div className="flex gap-[4rem]">
          <div className="flex flex-col items-center gap-[2rem]">
            <h3
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                "text-[0.8rem] leading-[1.1rem] tracking-[-0.0125rem] "
              )}
            >
              QTY.
            </h3>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
              )}
            >
              {props.selectedInvoice.quantity}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-[2rem]">
            <h3
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                "text-[0.8rem] leading-[1.1rem] tracking-[-0.0125rem] "
              )}
            >
              Price
            </h3>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
              )}
            >
              £{props.selectedInvoice.price.toFixed(2)}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-[2rem]">
            <h3
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                "text-[0.8rem] leading-[1.1rem] tracking-[-0.0125rem] "
              )}
            >
              Total
            </h3>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-all"
              )}
            >
              £{total.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsTable;
