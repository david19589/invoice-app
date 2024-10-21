import clsx from "clsx";
import { Invoice } from "../../../models/invoice-types";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BillFrom from "./components/bill-from";
import BillTo from "./components/bill-to";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../../utils/schema";
import { getInvoice, updateInvoice } from "../../../utils/api";
import deleteIcon from "/src/assets/icon-delete.svg";

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

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = methods;

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

  useEffect(() => {
    if (props.selectedInvoice) {
      if (fields.length === 0) {
        setValue("items", [
          {
            itemName: props.selectedInvoice.item_name,
            quantity: props.selectedInvoice.quantity,
            price: props.selectedInvoice.price,
          },
        ]);
      }
    }
  }, [fields.length, props.selectedInvoice, setValue]);

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
                        placeholder={field.itemName || "Item Name"}
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
                            placeholder={field.quantity?.toString() || "0"}
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
                            placeholder={field.price?.toString() || "0"}
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
                          if (fields.length > 1) {
                            remove(index);
                          }
                        }}
                        className="ml-[1rem] select-none"
                      >
                        <img src={deleteIcon} alt="deleteIcon" />
                      </button>
                    </div>
                  </div>
                ))}
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
