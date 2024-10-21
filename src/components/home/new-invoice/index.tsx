import clsx from "clsx";
import { Invoice } from "../../models/invoice-types";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BillFrom from "./components/bill-from";
import BillTo from "./components/bill-to";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../utils/new-invoice-schema";
import { addInvoice, getInvoice } from "../../utils/api";
import { useParams } from "react-router-dom";
import deleteIcon from "/src/assets/icon-delete.svg";

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

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const formattedDate = new Date(
    props.newStartDate ? props.newStartDate : new Date()
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const onSubmit = async (data: FormData) => {
    if (fields.length > 0) {
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
    }
  };

  const { id } = useParams();

  const selectedInvoice = props.invoice.find((item) => item.id === id);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const calculateTotal = (index: number) => {
    const quantity = watch(`items.${index}.quantity`) || 0;
    const price = watch(`items.${index}.price`) || 0;
    return (quantity * price).toFixed(2);
  };

  const DarkModeStyles = props.darkMode
    ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
    : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]";

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
              <div className="mb-[5rem]">
                <h1 className="text-[1.1rem] leading-[2rem] tracking-[-0.025rem] font-[700] text-[#777F98] mb-[1.5rem]">
                  Item List
                </h1>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="md:flex md:items-center md:gap-[1rem] mb-[3rem]"
                  >
                    <div className="md:mb-0 mb-[1rem]">
                      <div className="flex justify-between">
                        <h3
                          className={clsx(
                            errors.items && errors.items[index]?.itemName
                              ? "text-[#EC5757]"
                              : props.darkMode
                              ? "text-[#888EB0]"
                              : "text-[#7E88C3]",
                            "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                          )}
                        >
                          Item Name
                        </h3>
                        {errors.items && errors.items[index]?.itemName && (
                          <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                            {errors.items &&
                              errors.items[index]?.itemName.message?.toString()}
                          </span>
                        )}
                      </div>
                      <input
                        {...register(`items.${index}.itemName`)}
                        type="text"
                        className={clsx(
                          errors.items &&
                            errors.items[index]?.itemName &&
                            props.darkMode
                            ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                            : errors.items && errors.items[index]?.itemName
                            ? "border-[#EC5757]"
                            : DarkModeStyles,
                          "md:max-w-[13.5rem] text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[20rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
                        )}
                      />
                    </div>
                    <div className="md:gap-[1.5rem] flex justify-between">
                      <div className="flex items-center gap-[1rem]">
                        <div>
                          <div className="flex justify-between">
                            <h3
                              className={clsx(
                                errors.items && errors.items[index]?.quantity
                                  ? "text-[#EC5757]"
                                  : props.darkMode
                                  ? "text-[#888EB0]"
                                  : "text-[#7E88C3]",
                                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                              )}
                            >
                              Qty.
                            </h3>
                            {errors.items && errors.items[index]?.quantity && (
                              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                                {errors.items &&
                                  errors.items[
                                    index
                                  ]?.quantity.message?.toString()}
                              </span>
                            )}
                          </div>
                          <input
                            {...register(`items.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                            type="text"
                            placeholder="0"
                            className={clsx(
                              errors.items &&
                                errors.items[index]?.quantity &&
                                props.darkMode
                                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                                : errors.items && errors.items[index]?.quantity
                                ? "border-[#EC5757]"
                                : DarkModeStyles,
                              "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[4rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h3
                              className={clsx(
                                errors.items && errors.items[index]?.price
                                  ? "text-[#EC5757]"
                                  : props.darkMode
                                  ? "text-[#888EB0]"
                                  : "text-[#7E88C3]",
                                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                              )}
                            >
                              Price
                            </h3>
                            {errors.items && errors.items[index]?.price && (
                              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                                {errors.items &&
                                  errors.items[
                                    index
                                  ]?.price.message?.toString()}
                              </span>
                            )}
                          </div>
                          <input
                            {...register(`items.${index}.price`, {
                              valueAsNumber: true,
                            })}
                            type="text"
                            placeholder="0"
                            className={clsx(
                              errors.items &&
                                errors.items[index]?.price &&
                                props.darkMode
                                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                                : errors.items && errors.items[index]?.price
                                ? "border-[#EC5757]"
                                : DarkModeStyles,
                              "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[6.25rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
                            )}
                          />
                        </div>
                        <div>
                          <h3
                            className={clsx(
                              props.darkMode
                                ? "text-[#888EB0]"
                                : "text-[#7E88C3]",
                              "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                            )}
                          >
                            Total
                          </h3>
                          <h2 className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] text-[#888EB0] mb-[0.5rem] max-w-[6.25rem] w-full py-[1rem]">
                            {calculateTotal(index)}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                        className="ml-[1rem] select-none"
                      >
                        <img src={deleteIcon} alt="deleteIcon" />
                      </button>
                    </div>
                  </div>
                ))}
                <h2 className="text-[0.9rem] leading-[1rem] tracking-[-0.015rem] font-[600] text-[#EC5757] w-max mb-[1rem]">
                  {fields.length < 1 && "An item must be added"}
                </h2>
                <div className="flex justify-center w-full">
                  <button
                    type="button"
                    onClick={() =>
                      append({ itemName: "", quantity: 0, price: 0 })
                    }
                    className={clsx(
                      props.darkMode
                        ? "bg-[#252945] text-[#888EB0]"
                        : "bg-[#F9FAFE] text-[#7E88C3]",
                      "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] py-[1rem] select-none rounded-full max-w-[20rem] w-full mb-[2rem]"
                    )}
                  >
                    + Add New Item
                  </button>
                </div>
              </div>
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
