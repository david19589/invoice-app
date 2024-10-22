import clsx from "clsx";
import { Invoice } from "../../../../models/invoice-types";
import { invoiceDeletion } from "../../../../../utils/api";

function Deletion(props: {
  darkMode: boolean;
  confirmDeletion: boolean;
  setConfirmDeletion: (status: boolean) => void;
  selectedInvoice: Invoice;
  invoice: Invoice[];
  setInvoice: (status: Invoice[]) => void;
}) {
  const deleteInvoice = async () => {
    try {
      await invoiceDeletion(props.selectedInvoice.id);
      const updatedInvoice = props.invoice.filter(
        (inv) => inv.id !== props.selectedInvoice.id
      );
      props.setInvoice(updatedInvoice);

      window.location.href = "/";
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  return (
    <>
      {props.confirmDeletion && (
        <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 p-[2rem] min-h-screen bg-[#0000004f] z-20">
          <div
            className={clsx(
              props.darkMode ? "bg-[#141625]" : "bg-[#FFF]",
              props.confirmDeletion
                ? "translate-y-0"
                : "translate-y-[-1000rem]",
              "max-w-[26rem] w-full p-[2rem] rounded-lg"
            )}
          >
            <h1
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "text-[1.5rem] leading-[2rem] tracking-[-0.0315rem] font-[700] mb-[0.75rem]"
              )}
            >
              Confirm Deletion
            </h1>
            <p
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[ #888EB0]",
                "text-[0.8rem] leading-[1.4rem] tracking-[-0.0125rem] max-w-[22rem] font-[500] mb-[1rem]"
              )}
            >
              Are you sure you want to delete invoice #
              {props.selectedInvoice.id.slice(0, 6)}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end w-full">
              <button
                onClick={() => {
                  props.setConfirmDeletion(false);
                }}
                className={clsx(
                  props.darkMode
                    ? "bg-[#252945] text-[#DFE3FA]"
                    : "bg-[#F9FAFE] text-[#7E88C3]",
                  "text-[1rem] leading-[1rem] tracking-[-0.0125rem] font-[700] max-w-[6rem] w-full px-[0.5rem] py-[1rem] rounded-full mr-[0.5rem]] outline-none"
                )}
              >
                Cancel
              </button>
              <button
                onClick={deleteInvoice}
                className="text-[1rem] leading-[1rem] tracking-[-0.0125rem] font-[700] bg-[#EC5757] text-[#FFF] max-w-[6rem] w-full px-[0.5rem] py-[1rem] rounded-full mr-[0.5rem] outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Deletion;
