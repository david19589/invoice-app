import clsx from "clsx";
import { Invoice } from "../../models/invoice-types";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BillFrom from "./components/bill-from";
import BillTo from "./components/bill-to";
import ItemList from "./components/item-list";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../utils/new-invoice-schema";
import { addInvoice, getInvoice } from "../../utils/api";
import { useParams } from "react-router-dom";

function NewInvoice(props: {
  darkMode: boolean;
  openNewInvoice: boolean;
  setOpenNewInvoice: (status: boolean) => void;
  netDays: number | null;
  setNetDays: (status: number | null) => void;
  setInvoice: (status: Invoice[]) => void;
  newStartDate: Date | null;
  setNewStartDate: (status: Date | null) => void;
  invoice: Invoice[];
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [markAsStatus, setMarkAsStatus] = useState(false);

  useEffect(() => {
    if (props.openNewInvoice) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [props.openNewInvoice]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const formattedDate = new Date(
    props.newStartDate ? props.newStartDate : new Date()
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const invoiceData = {
        ...data,
        invoiceDate: props.newStartDate?.toISOString() || formattedDate,
        paymentTerms: props.netDays?.toString() || "",
        invoiceStatus: markAsStatus ? "pending" : "draft",
      };
      console.log("Invoice Data to Send:", invoiceData);
      await addInvoice(invoiceData);
      console.log("Invoice added successfully");
    } catch (err) {
      console.error("Error adding invoice:", err);
    }
    reset();
    props.setOpenNewInvoice(false);
    props.setNewStartDate(null);
    props.setNetDays(null);
    props.setInvoice(await getInvoice());
    setShowCalendar(false);
    setOpenTerms(false);
  };

  const { id } = useParams();

  const selectedInvoice = props.invoice.find((item) => item.id === id);

  return (
    <div
      className={clsx(
        props.openNewInvoice ? "translate-x-0" : "translate-x-[-1000rem]",
        "lg:pl-[5.5rem] fixed top-0 bottom-0 left-0 right-0 min-h-screen bg-[#0000004f] z-10"
      )}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={clsx(
              props.openNewInvoice ? "translate-x-0" : "translate-x-[-100rem]",
              props.darkMode ? "bg-[#141625]" : "bg-[#FFF]",
              "md:max-w-[38.5rem] md:p-[3.5rem] md:pt-[6rem] flex flex-col p-[1.5rem] pt-[6rem] max-w-[23rem] h-screen rounded-r-lg transition-all duration-250 overflow-y-auto custom-scrollbar"
            )}
          >
            <button
              onClick={() => {
                props.setOpenNewInvoice(false);
              }}
              className="md:hidden flex items-baseline gap-[1rem] mb-[2rem] w-max"
            >
              <img src={arrowLeft} alt="arrowLeft" />
              <h3
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                  "text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem]"
                )}
              >
                Go back
              </h3>
            </button>
            <div className="flex gap-[0.5rem] mb-[1.4rem]">
              <h2
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#000]",
                  "text-[1.5rem] leading-[2rem] tracking-[-0.030rem] font-[700]"
                )}
              >
                New Invoice
              </h2>
            </div>
            <BillFrom darkMode={props.darkMode} />
            <div>
              <BillTo
                darkMode={props.darkMode}
                netDays={props.netDays}
                setNetDays={props.setNetDays}
                newStartDate={props.newStartDate}
                setNewStartDate={props.setNewStartDate}
                formattedDate={formattedDate}
                selectedInvoice={selectedInvoice}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                openTerms={openTerms}
                setOpenTerms={setOpenTerms}
              />
              <ItemList darkMode={props.darkMode} />
            </div>
          </div>
          <div
            className={clsx(
              props.openNewInvoice ? "translate-x-0" : "translate-x-[-100rem]",
              props.darkMode ? "bg-[#141625]" : "bg-[#FFF]",
              "md:justify-between md:max-w-[38.5rem] flex justify-center gap-[0.5rem] py-[1.5rem] px-[3.5rem] max-w-[23rem] w-full fixed bottom-0 shadow-custom-shadow-3"
            )}
          >
            <button
              type="button"
              onClick={() => {
                props.setOpenNewInvoice(false);
                props.setNewStartDate(null);
                props.setNetDays(null);
                setShowCalendar(false);
                setOpenTerms(false);
                reset();
                props.setNewStartDate(null);
              }}
              className={clsx(
                props.darkMode
                  ? "bg-[#252945] text-[#888EB0]"
                  : "bg-[#F9FAFE] text-[#7E88C3]",
                "md:min-w-[7.5rem] sm:min-w-[6.5rem] sm:text-[1rem] text-[0.8rem] leading-[1rem] tracking-[-0.015rem] font-[700] py-[1rem] select-none rounded-full max-w-[6rem] min-w-[6rem] w-full outline-none"
              )}
            >
              Discard
            </button>
            <div className="flex gap-[0.5rem]">
              <button
                onClick={() => {
                  setMarkAsStatus(false);
                }}
                type="submit"
                className={clsx(
                  props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
                  "md:min-w-[8rem] sm:min-w-[7rem] sm:text-[0.9rem] text-[0.7rem] sm:leading-[1rem] leading-[0rem] tracking-[-0.015rem] font-[700] bg-[#373B53] sm:py-[1rem] py-0 select-none rounded-full max-w-[8.5rem] min-w-[5rem] w-full outline-none"
                )}
              >
                Save as Draft
              </button>
              <button
                onClick={() => {
                  setMarkAsStatus(true);
                }}
                type="submit"
                className="md:min-w-[8rem] sm:min-w-[7rem] sm:text-[0.9rem] text-[0.7rem] sm:leading-[1rem] leading-[0rem] tracking-[-0.015rem] font-[700] text-[#FFF] bg-[#7C5DFA] sm:py-[1rem] py-0 select-none rounded-full max-w-[8.5rem] min-w-[5rem] w-full outline-none"
              >
                Save & Send
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default NewInvoice;
