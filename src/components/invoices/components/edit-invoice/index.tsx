import clsx from "clsx";
import { Invoice } from "../../../models/invoice-types";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BillFrom from "./components/bill-from";
import BillTo from "./components/bill-to";
import ItemList from "./components/item-list";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../../utils/schema";
import { getInvoice, updateInvoice } from "../../../utils/api";

function EditInvoice(props: {
  darkMode: boolean;
  selectedInvoice: Invoice;
  openEdit: boolean;
  setOpenEdit: (status: boolean) => void;
  netDays: number | null;
  setNetDays: (status: number | null) => void;
  setInvoice: (status: Invoice[]) => void;
  startDate: Date | null;
  setStartDate: (status: Date | null) => void;
  formattedDate: string;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  useEffect(() => {
    if (props.openEdit) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [props.openEdit]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      const invoiceData = {
        ...data,
        id: props.selectedInvoice.id,
        invoiceDate: props.startDate?.toISOString() || "",
        paymentTerms: props.netDays?.toString() || "",
      };
      await updateInvoice(invoiceData.id, invoiceData);
    } catch (err) {
      console.error("Error updating invoice:", err);
    }
    reset();
    props.setInvoice(await getInvoice());
    props.setOpenEdit(false);
    setShowCalendar(false);
    setOpenTerms(false);
  };

  return (
    <div
      className={clsx(
        props.openEdit ? "translate-x-0" : "translate-x-[-1000rem]",
        "lg:pl-[5.5rem] fixed top-0 bottom-0 left-0 right-0 min-h-screen bg-[#0000004f] z-10"
      )}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={clsx(
              props.openEdit ? "translate-x-0" : "translate-x-[-100rem]",
              props.darkMode ? "bg-[#141625]" : "bg-[#FFF]",
              "lg:pt-[3rem] md:max-w-[38.5rem] md:p-[3.5rem] md:pt-[6rem] flex flex-col p-[1.5rem] pt-[6rem] max-w-[23rem] h-screen rounded-r-lg transition-all duration-250 overflow-y-auto custom-scrollbar"
            )}
          >
            <button
              onClick={() => {
                props.setOpenEdit(false);
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
                Edit
              </h2>
              <div className="flex">
                <span className="text-[1.5rem] leading-[2rem] tracking-[-0.030rem] font-[700] text-[#7E88C3]">
                  #
                </span>
                <h2
                  className={clsx(
                    props.darkMode ? "text-[#FFF]" : "text-[#000]",
                    "text-[1.5rem] leading-[2rem] tracking-[-0.030rem] font-[700]"
                  )}
                >
                  {props.selectedInvoice.id.slice(0, 6)}
                </h2>
              </div>
            </div>
            <BillFrom
              darkMode={props.darkMode}
              selectedInvoice={props.selectedInvoice}
            />
            <div>
              <BillTo
                darkMode={props.darkMode}
                selectedInvoice={props.selectedInvoice}
                netDays={props.netDays}
                setNetDays={props.setNetDays}
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                formattedDate={props.formattedDate}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                openTerms={openTerms}
                setOpenTerms={setOpenTerms}
              />
              <ItemList
                darkMode={props.darkMode}
                selectedInvoice={props.selectedInvoice}
              />
            </div>
          </div>
          <div
            className={clsx(
              props.openEdit ? "translate-x-0" : "translate-x-[-100rem]",
              props.darkMode ? "bg-[#141625]" : "bg-[#FFF]",
              "md:justify-end md:max-w-[38.5rem] flex justify-center gap-[0.5rem] py-[1.5rem] px-[3.5rem] max-w-[23rem] w-full fixed bottom-0 shadow-custom-shadow-3"
            )}
          >
            <button
              type="button"
              onClick={() => {
                props.setOpenEdit(false);
                props.setStartDate(null);
                props.setNetDays(null);
                setShowCalendar(false);
                setOpenTerms(false);
                reset();
              }}
              className={clsx(
                props.darkMode
                  ? "bg-[#252945] text-[#888EB0]"
                  : "bg-[#F9FAFE] text-[#7E88C3]",
                "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] py-[1rem] select-none rounded-full max-w-[6rem] min-w-[6rem] w-full"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] text-[#FFF] bg-[#7C5DFA] py-[1rem] select-none rounded-full max-w-[8.5rem] min-w-[8rem] w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditInvoice;
