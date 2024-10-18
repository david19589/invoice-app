import calendarIcon from "/src/assets/icon-calendar.svg";
import arrowDown from "/src/assets/icon-arrow-down.svg";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";
import { Invoice } from "../../../../models/invoice-types";

function BillTo(props: {
  darkMode: boolean;
  netDays: number | null;
  setNetDays: (status: number | null) => void;
  newStartDate: Date | null;
  setNewStartDate: (status: Date | null) => void;
  formattedDate: string;
  selectedInvoice: Invoice | undefined;
  showCalendar: boolean;
  setShowCalendar: (status: boolean) => void;
  openTerms: boolean;
  setOpenTerms: (status: boolean) => void;
}) {
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      props.setNewStartDate(date);
    }
    props.setShowCalendar(false);
  };

  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext();

  const renderPaymentOptions = (options: { days: number; label: string }[]) => {
    return options.map(({ days, label }, index) => (
      <div key={days}>
        <h2
          onClick={() => {
            props.setNetDays(days);
            props.setOpenTerms(false);
            setValue("paymentTerms", label);
            trigger("paymentTerms");
          }}
          className={clsx(
            props.darkMode
              ? "text-[#DFE3FA] hover:text-[#7C5DFA]"
              : "text-[#0C0E16] hover:text-[#9277FF]",
            "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mx-[1.5rem] cursor-pointer transition-all duration-150"
          )}
        >
          {label}
        </h2>
        {index < options.length - 1 && (
          <span
            className={clsx(
              props.darkMode ? "bg-[#1E2139]" : "bg-[#DFE3FA]",
              "flex h-[0.0625rem] max-w-full w-full my-[1rem]"
            )}
          ></span>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h2 className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] text-[#7C5DFA] mb-[1.5rem]">
        Bill To
      </h2>
      <div className="mb-[1.5rem]">
        <div className="flex justify-between">
          <h3
            className={clsx(
              errors.clientsName
                ? "text-[#EC5757]"
                : props.darkMode
                ? "text-[#888EB0]"
                : "text-[#7E88C3]",
              "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
            )}
          >
            Client`s Name
          </h3>
          {errors.clientsName && (
            <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
              {errors.clientsName.message?.toString()}
            </span>
          )}
        </div>
        <input
          {...register("clientsName")}
          type="text"
          id="clients-name"
          className={clsx(
            errors.clientsName && props.darkMode
              ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
              : errors.clientsName
              ? "border-[#EC5757]"
              : props.darkMode
              ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
              : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
            "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[31.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
          )}
        />
      </div>
      <div className="mb-[1.5rem]">
        <div className="flex justify-between">
          <h3
            className={clsx(
              errors.clientsEmail
                ? "text-[#EC5757]"
                : props.darkMode
                ? "text-[#888EB0]"
                : "text-[#7E88C3]",
              "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
            )}
          >
            Client`s Email
          </h3>
          {errors.clientsEmail && (
            <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
              {errors.clientsEmail.message?.toString()}
            </span>
          )}
        </div>
        <input
          {...register("clientsEmail")}
          type="text"
          id="clients-email"
          placeholder="e.g. email@example.com"
          className={clsx(
            errors.clientsEmail && props.darkMode
              ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
              : errors.clientsEmail
              ? "border-[#EC5757]"
              : props.darkMode
              ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
              : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
            "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[31.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
          )}
        />
      </div>
      <div className="mb-[1.5rem]">
        <div className="flex justify-between">
          <h3
            className={clsx(
              errors.clientsStreetAddress
                ? "text-[#EC5757]"
                : props.darkMode
                ? "text-[#888EB0]"
                : "text-[#7E88C3]",
              "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
            )}
          >
            Street Address
          </h3>
          {errors.clientsStreetAddress && (
            <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
              {errors.clientsStreetAddress.message?.toString()}
            </span>
          )}
        </div>
        <input
          {...register("clientsStreetAddress")}
          type="text"
          id="clients-street-address"
          className={clsx(
            errors.clientsStreetAddress && props.darkMode
              ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
              : errors.clientsStreetAddress
              ? "border-[#EC5757]"
              : props.darkMode
              ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
              : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
            "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[31.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
          )}
        />
      </div>
      <div className="md:flex md:gap-[1.5rem]">
        <div className="flex justify-between items-center gap-[1.5rem]">
          <div className="mb-[1.5rem]">
            <div className="flex justify-between">
              <h3
                className={clsx(
                  errors.clientsCity
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3] hover:border-[#7C5DFA]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                City
              </h3>
              {errors.clientsCity && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                  {errors.clientsCity.message?.toString()}
                </span>
              )}
            </div>
            <input
              {...register("clientsCity")}
              type="text"
              id="clients-city"
              className={clsx(
                errors.clientsCity && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors.clientsCity
                  ? "border-[#EC5757]"
                  : props.darkMode
                  ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                  : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
                "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[9.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
              )}
            />
          </div>
          <div className="mb-[1.5rem]">
            <div className="flex justify-between">
              <h3
                className={clsx(
                  errors.clientsPostCode
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                Post Code
              </h3>
              {errors.clientsPostCode && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                  {errors.clientsPostCode.message?.toString()}
                </span>
              )}
            </div>
            <input
              {...register("clientsPostCode")}
              type="text"
              id="clients-post-code"
              className={clsx(
                errors.clientsPostCode && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors.clientsPostCode
                  ? "border-[#EC5757]"
                  : props.darkMode
                  ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                  : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
                "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[9.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
              )}
            />
          </div>
        </div>
        <div className="md:mb-0 mb-[2.5rem]">
          <div className="flex justify-between">
            <h3
              className={clsx(
                errors.clientsCountry
                  ? "text-[#EC5757]"
                  : props.darkMode
                  ? "text-[#888EB0]"
                  : "text-[#7E88C3]",
                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
              )}
            >
              Country
            </h3>
            {errors.clientsCountry && (
              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                {errors.clientsCountry.message?.toString()}
              </span>
            )}
          </div>
          <input
            {...register("clientsCountry")}
            type="text"
            id="clients-country"
            className={clsx(
              errors.clientsCountry && props.darkMode
                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                : errors.clientsCountry
                ? "border-[#EC5757]"
                : props.darkMode
                ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
              "md:max-w-[9.5rem] text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[20rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
            )}
          />
        </div>
      </div>
      <div className="mb-[4rem] relative">
        <div className="md:flex md:gap-[1.5rem]">
          <div className="md:flex md:flex-col">
            <div className="mb-[1.5rem]">
              <h3
                className={clsx(
                  props.darkMode ? "text-[#888EB0]" : "text-[#7E88C3]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                Invoice Date
              </h3>
              <div
                onClick={() => props.setShowCalendar(!props.showCalendar)}
                className={clsx(
                  props.darkMode
                    ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] hover:border-[#7C5DFA]"
                    : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] hover:border-[#9277FF]",
                  "md:w-[15rem] flex justify-between text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.6rem] outline-none border-[0.0625rem] max-w-[20rem] w-full px-[1.25rem] py-[1rem] rounded-lg cursor-pointer"
                )}
              >
                <h2>{props.formattedDate}</h2>
                <img
                  src={calendarIcon}
                  alt="calendarIcon"
                  className="cursor-pointer select-none"
                />
              </div>
            </div>
            {props.showCalendar && (
              <div className="md:absolute md:top-[5.5rem] select-none">
                <DatePicker
                  {...register("invoiceDate")}
                  selected={props.newStartDate}
                  onChange={handleChangeDate}
                  inline
                />
              </div>
            )}
          </div>
          <div {...register("paymentTerms")} className="mb-[1.5rem]">
            <div className="md:max-w-[14.35rem] flex justify-between">
              <h3
                className={clsx(
                  errors.paymentTerms
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3]",
                  "md:w-[15rem] text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                Payment Terms
              </h3>
              {errors.paymentTerms && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                  {errors.paymentTerms.message?.toString()}
                </span>
              )}
            </div>
            <div
              onClick={() => {
                props.setOpenTerms(!props.openTerms);
              }}
              className={clsx(
                errors.paymentTerms && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors.paymentTerms
                  ? "border-[#EC5757]"
                  : props.darkMode
                  ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] hover:border-[#7C5DFA]"
                  : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] hover:border-[#9277FF]",
                "flex justify-between items-center border-[0.0625rem] max-w-[20rem] w-full px-[1.25rem] py-[1rem] rounded-lg cursor-pointer mb-[0.5rem]"
              )}
            >
              <h2 className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700]">
                {props.netDays
                  ? `Net ${props.netDays} ${
                      props.netDays === 1 ? "Day" : "Days"
                    }`
                  : props.selectedInvoice?.payment_terms
                  ? `Net ${props.selectedInvoice.payment_terms} ${
                      Number(props.selectedInvoice.payment_terms) === 1
                        ? "Day"
                        : "Days"
                    }`
                  : "No Payment Terms Set"}
              </h2>
              <img
                src={arrowDown}
                alt="arrowDown"
                className={clsx(props.openTerms && "rotate-180", "select-none")}
              />
            </div>
            <div
              className={clsx(
                props.darkMode ? "bg-[#252945]" : "bg-[#FFF]",
                props.openTerms
                  ? "md:max-w-[15rem] flex flex-col absolute max-w-[20rem] w-full shadow-custom-shadow py-[1rem] rounded-lg select-none"
                  : "hidden"
              )}
            >
              {renderPaymentOptions([
                { days: 1, label: "Net 1 Day" },
                { days: 7, label: "Net 7 Days" },
                { days: 14, label: "Net 14 Days" },
                { days: 30, label: "Net 30 Days" },
              ])}
            </div>
          </div>
        </div>
        <div className="mb-[2.5rem]">
          <div className="flex justify-between">
            <h3
              className={clsx(
                errors.projectDescription
                  ? "text-[#EC5757]"
                  : props.darkMode
                  ? "text-[#888EB0]"
                  : "text-[#7E88C3]",
                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
              )}
            >
              Project Description
            </h3>
            {errors.projectDescription && (
              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
                {errors.projectDescription.message?.toString()}
              </span>
            )}
          </div>
          <input
            {...register("projectDescription")}
            type="text"
            id="project-description"
            placeholder="e.g. Graphic Design Service"
            className={clsx(
              errors.projectDescription && props.darkMode
                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                : errors.projectDescription
                ? "border-[#EC5757]"
                : props.darkMode
                ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
                : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]",
              "md:max-w-[31.5rem] text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[20rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
            )}
          />
        </div>
      </div>
    </div>
  );
}
export default BillTo;
