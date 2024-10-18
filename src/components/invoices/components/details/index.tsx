import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { Invoice } from "../../../models/invoice-types";
import ItemsTable from "../items-table";
import EditInvoice from "../edit-invoice";
import { useState } from "react";
import Deletion from "./deletion";
import { handleChangeStatus } from "../../../utils/status_change";

function Details(props: {
  darkMode: boolean;
  invoice: Invoice[];
  setInvoice: (status: Invoice[]) => void;
  netDays: number | null;
  setNetDays: (status: number | null) => void;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const { id } = useParams();

  const selectedInvoice = props.invoice.find((item) => item.id === id);

  if (!selectedInvoice) {
    return <h2>Invoice not found.</h2>;
  }

  const invoiceDate = new Date(selectedInvoice.invoice_date);
  const paymentDueDate = new Date(invoiceDate);
  paymentDueDate.setDate(
    invoiceDate.getDate() + Number(selectedInvoice.payment_terms)
  );

  const formattedPayment = paymentDueDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedDate = new Date(
    startDate ? startDate : selectedInvoice.invoice_date
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const markAsPaid = () => {
    handleChangeStatus(selectedInvoice.id, "paid", (newStatus) => {
      const updatedInvoices = props.invoice.map((inv) =>
        inv.id === selectedInvoice.id
          ? { ...inv, invoice_status: newStatus }
          : inv
      );
      props.setInvoice(updatedInvoices);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <div className="p-[1.5rem] pb-0 max-w-[45.625rem] w-full mb-[4rem] mt-[5rem]">
          <Link to="/" className="flex w-fit mb-[2rem]">
            <button className="flex items-baseline gap-[1rem] group">
              <img src={arrowLeft} alt="arrowLeft" />
              <h3
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                  "text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem] group-hover:text-[#7E88C3] transition-all duration-150"
                )}
              >
                Go back
              </h3>
            </button>
          </Link>
          <div
            className={clsx(
              props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
              "md:p-[2rem] flex justify-between items-center p-[1.5rem] w-full rounded-lg shadow-custom-shadow-2 mb-[1rem]"
            )}
          >
            <div className="md:justify-normal md:w-max md:gap-[1.5rem] flex justify-between w-full items-center">
              <h2
                className={clsx(
                  props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
                  "text-[0.8rem] leading-[1rem] font-[500]"
                )}
              >
                Status
              </h2>
              <div
                className={clsx(
                  selectedInvoice.invoice_status === "paid" && "bg-[#33d6a018]",
                  selectedInvoice.invoice_status === "pending" &&
                    "bg-[#ff910018]",
                  selectedInvoice.invoice_status === "draft" &&
                    (props.darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
                  "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
                )}
              >
                <span
                  className={clsx(
                    selectedInvoice.invoice_status === "paid" && "bg-[#33D69F]",
                    selectedInvoice.invoice_status === "pending" &&
                      "bg-[#FF8F00]",
                    selectedInvoice.invoice_status === "draft" &&
                      (props.darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                    "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
                  )}
                ></span>
                <h2
                  className={clsx(
                    selectedInvoice.invoice_status === "paid" &&
                      "text-[#33D69F]",
                    selectedInvoice.invoice_status === "pending" &&
                      "text-[#FF8F00]",
                    selectedInvoice.invoice_status === "draft" &&
                      (props.darkMode ? "text-[#DFE3FA]" : "text-[#373B53]"),
                    "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                  )}
                >
                  {selectedInvoice.invoice_status}
                </h2>
              </div>
            </div>
            <div className="md:flex hidden justify-between gap-[0.5rem]">
              <button
                onClick={() => {
                  setOpenEdit(true);
                }}
                className={clsx(
                  props.darkMode
                    ? "bg-[#252945] text-[#DFE3FA]"
                    : "bg-[#F9FAFE] text-[#7E88C3]",
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#DFE3FA] hover:text-[#7E88C3] transition-all duration-150"
                )}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setConfirmDeletion(true);
                }}
                className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#FFF] bg-[#EC5757] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#FF9797] transition-all duration-150"
              >
                Delete
              </button>
              {selectedInvoice.invoice_status !== "paid" && (
                <button
                  onClick={markAsPaid}
                  className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#FFF] bg-[#7C5DFA] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#9277FF] transition-all duration-150"
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
          <div
            className={clsx(
              props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
              "md:p-[2rem] flex flex-col p-[1.5rem] w-full rounded-lg shadow-custom-shadow-2"
            )}
          >
            <div className="mb-[2rem]">
              <div className="md:flex md:justify-between mb-[2rem]">
                <div>
                  <div className="flex">
                    <span className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#7E88C3]">
                      #
                    </span>
                    <h2
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-words"
                      )}
                    >
                      {selectedInvoice.id.slice(0, 6)}
                    </h2>
                  </div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500] mb-[2rem] break-words"
                    )}
                  >
                    {selectedInvoice.project_description}
                  </h3>
                </div>
                <div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "md:text-end text-[0.8rem] leading-[1rem] font-[500] break-words"
                    )}
                  >
                    {selectedInvoice.street_address}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "md:text-end text-[0.8rem] leading-[1rem] font-[500] break-words"
                    )}
                  >
                    {selectedInvoice.city}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "md:text-end text-[0.8rem] leading-[1rem] font-[500] break-words"
                    )}
                  >
                    {selectedInvoice.post_code}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "md:text-end text-[0.8rem] leading-[1rem] font-[500] break-words"
                    )}
                  >
                    {selectedInvoice.country}
                  </h3>
                </div>
              </div>
              <div className="md:flex md:justify-between">
                <div className="md:gap-[8rem] flex justify-between gap-[0.5rem] mb-[2rem]">
                  <div>
                    <div className="mb-[2rem]">
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                        )}
                      >
                        Invoice Date
                      </h3>
                      <h2
                        className={clsx(
                          props.darkMode ? "text-[#FFF]" : "text-[#000]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-words"
                        )}
                      >
                        {formattedDate}
                      </h2>
                    </div>
                    <div>
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                        )}
                      >
                        Payment Due
                      </h3>
                      <h2
                        className={clsx(
                          props.darkMode ? "text-[#FFF]" : "text-[#000]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-words"
                        )}
                      >
                        {formattedPayment}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                        "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                      )}
                    >
                      Bill To
                    </h3>
                    <h2
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem] break-words"
                      )}
                    >
                      {selectedInvoice.clients_name}
                    </h2>
                    <div>
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] break-words"
                        )}
                      >
                        {selectedInvoice.clients_street_address}
                      </h3>
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] break-words"
                        )}
                      >
                        {selectedInvoice.clients_city}
                      </h3>
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] break-words"
                        )}
                      >
                        {selectedInvoice.clients_post_code}
                      </h3>
                      <h3
                        className={clsx(
                          props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                          "text-[0.8rem] leading-[1rem] font-[500] break-words"
                        )}
                      >
                        {selectedInvoice.clients_country}
                      </h3>
                    </div>
                  </div>
                </div>
                <div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                    )}
                  >
                    Sent to
                  </h3>
                  <h2
                    className={clsx(
                      props.darkMode ? "text-[#FFF]" : "text-[#000]",
                      "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] break-words"
                    )}
                  >
                    {selectedInvoice.clients_email}
                  </h2>
                </div>
              </div>
            </div>
            <ItemsTable
              darkMode={props.darkMode}
              selectedInvoice={selectedInvoice}
            />
          </div>
        </div>
        <div
          className={clsx(
            props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
            "md:hidden flex flex-col sm:flex-row justify-between p-[1.5rem] w-full gap-[0.5rem]"
          )}
        >
          <button
            onClick={() => {
              setOpenEdit(true);
            }}
            className={clsx(
              props.darkMode
                ? "bg-[#252945] text-[#DFE3FA]"
                : "bg-[#F9FAFE] text-[#7E88C3]",
              "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#DFE3FA] transition-all duration-150"
            )}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setConfirmDeletion(true);
            }}
            className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#FFF] bg-[#EC5757] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#FF9797] transition-all duration-150"
          >
            Delete
          </button>
          {selectedInvoice.invoice_status !== "paid" && (
            <button
              onClick={markAsPaid}
              className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#FFF] bg-[#7C5DFA] px-[1.5rem] py-[1.1rem] rounded-full hover:bg-[#9277FF] transition-all duration-150"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>
      <EditInvoice
        darkMode={props.darkMode}
        selectedInvoice={selectedInvoice}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        netDays={props.netDays}
        setNetDays={props.setNetDays}
        setInvoice={props.setInvoice}
        startDate={startDate}
        setStartDate={setStartDate}
        formattedDate={formattedDate}
      />
      <Deletion
        darkMode={props.darkMode}
        confirmDeletion={confirmDeletion}
        setConfirmDeletion={setConfirmDeletion}
        selectedInvoice={selectedInvoice}
        invoice={props.invoice}
        setInvoice={props.setInvoice}
      />
    </>
  );
}

export default Details;
