import deleteIcon from "/src/assets/icon-delete.svg";
import clsx from "clsx";
import { Invoice } from "../../../../../models/invoice-types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect } from "react";


function ItemList(props: { darkMode: boolean; selectedInvoice: Invoice }) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchedItems?.[index],
  }));

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
    <div className="mb-[5rem]">
      <h1 className="text-[1.1rem] leading-[2rem] tracking-[-0.025rem] font-[700] text-[#777F98] mb-[1.5rem]">
        Item List
      </h1>
      {controlledFields.map((field, index) => (
        <div
          key={field.id}
          className="md:flex md:items-center md:gap-[1rem] mb-[3rem]"
        >
          <div className="md:mb-0 mb-[1rem]">
            <div className="flex justify-between">
              <h3
                className={clsx(
                  errors[`items.${index}.itemName`]
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                Item Name
              </h3>
              {errors[`items.${index}.itemName`] && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                  {errors[`items.${index}.itemName`]?.message?.toString()}
                </span>
              )}
            </div>
            <input
              {...register(`items.${index}.itemName`)}
              type="text"
              placeholder={field.itemName || "Item Name"}
              className={clsx(
                errors[`items.${index}.itemName`] && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors[`items.${index}.itemName`]
                  ? "border-[#EC5757]"
                  : props.darkMode
                  ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                  : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
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
                      errors[`items.${index}.quantity`]
                        ? "text-[#EC5757]"
                        : props.darkMode
                        ? "text-[#888EB0]"
                        : "text-[#7E88C3]",
                      "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                    )}
                  >
                    Qty.
                  </h3>
                  {errors[`items.${index}.quantity`] && (
                    <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                      {errors[`items.${index}.quantity`]?.message?.toString()}
                    </span>
                  )}
                </div>
                <input
                  {...register(`items.${index}.quantity`)}
                  type="text"
                  placeholder={field.quantity?.toString() || "0"}
                  className={clsx(
                    errors[`items.${index}.quantity`] && props.darkMode
                      ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                      : errors[`items.${index}.quantity`]
                      ? "border-[#EC5757]"
                      : props.darkMode
                      ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                      : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
                    "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[4rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
                  )}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h3
                    className={clsx(
                      errors[`items.${index}.price`]
                        ? "text-[#EC5757]"
                        : props.darkMode
                        ? "text-[#888EB0]"
                        : "text-[#7E88C3]",
                      "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                    )}
                  >
                    Price
                  </h3>
                  {errors[`items.${index}.price`] && (
                    <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                      {errors[`items.${index}.price`]?.message?.toString()}
                    </span>
                  )}
                </div>
                <input
                  {...register(`items.${index}.price`)}
                  type="text"
                  placeholder={field.price?.toString() || "0"}
                  className={clsx(
                    errors[`items.${index}.price`] && props.darkMode
                      ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                      : errors[`items.${index}.price`]
                      ? "border-[#EC5757]"
                      : props.darkMode
                      ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                      : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
                    "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[6.25rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
                  )}
                />
              </div>
              <div>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#888EB0]" : "text-[#7E88C3]",
                    "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                  )}
                >
                  Total
                </h3>
                <h2 className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] text-[#888EB0] mb-[0.5rem] max-w-[6.25rem] w-full py-[1rem]">
                  {(field.quantity * field.price).toFixed(2) || "0.00"}
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
          onClick={() => append({ itemName: "", quantity: 0, price: 0 })}
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
  );
}
export default ItemList;
