import deleteIcon from "/src/assets/icon-delete.svg";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

function ItemList(props: { darkMode: boolean }) {
  //  const total = deleteIco;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-[5rem]">
      <h1 className="text-[1.1rem] leading-[2rem] tracking-[-0.025rem] font-[700] text-[#777F98] mb-[1.5rem]">
        Item List
      </h1>
      <div className="md:flex md:items-center md:gap-[1rem] mb-[3rem]">
        <div className="md:mb-0 mb-[1rem]">
          <div className="flex justify-between">
            <h3
              className={clsx(
                errors.itemName
                  ? "text-[#EC5757]"
                  : props.darkMode
                  ? "text-[#888EB0]"
                  : "text-[#7E88C3]",
                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
              )}
            >
              Item Name
            </h3>
            {errors.itemName && typeof errors.itemName.message === "string" && (
              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                {errors.itemName.message}
              </span>
            )}
          </div>
          <input
            {...register("itemName")}
            type="text"
            id="item-name"
            className={clsx(
              errors.itemName && props.darkMode
                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                : errors.itemName
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
                    errors.quantity
                      ? "text-[#EC5757]"
                      : props.darkMode
                      ? "text-[#888EB0]"
                      : "text-[#7E88C3]",
                    "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                  )}
                >
                  Qty.
                </h3>
                {errors.quantity &&
                  typeof errors.quantity.message === "string" && (
                    <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                      {errors.quantity.message}
                    </span>
                  )}
              </div>
              <input
                {...register("quantity", {
                  setValueAs: (value) => (value ? Number(value) : undefined),
                })}
                type="text"
                id="quantity"
                placeholder="0"
                className={clsx(
                  errors.quantity && props.darkMode
                    ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                    : errors.quantity
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
                    errors.price
                      ? "text-[#EC5757]"
                      : props.darkMode
                      ? "text-[#888EB0]"
                      : "text-[#7E88C3]",
                    "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                  )}
                >
                  Price
                </h3>
                {errors.price && typeof errors.price.message === "string" && (
                  <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <input
                {...register("price", {
                  setValueAs: (value) => (value ? Number(value) : undefined),
                })}
                type="text"
                id="price"
                placeholder="0.00"
                className={clsx(
                  errors.price && props.darkMode
                    ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                    : errors.price
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
                {}
              </h2>
            </div>
          </div>
          <button className="ml-[1rem] select-none">
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
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
