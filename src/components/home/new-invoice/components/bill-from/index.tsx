import clsx from "clsx";
import { useFormContext } from "react-hook-form";

function BillFrom(props: { darkMode: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const DarkModeStyles = props.darkMode
    ? "bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF] border-[#252945] focus:border-[#7C5DFA]"
    : "bg-[#FFF] placeholder:text-[#0C0E16] text-[#0C0E16] border-[#DFE3FA] focus:border-[#9277FF]";

  return (
    <div>
      <h2 className="text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] text-[#7C5DFA] mb-[1.5rem]">
        Bill From
      </h2>
      <div className="mb-[1.5rem]">
        <div className="flex justify-between">
          <h3
            className={clsx(
              errors.streetAddress
                ? "text-[#EC5757]"
                : props.darkMode
                ? "text-[#888EB0]"
                : "text-[#7E88C3]",
              "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
            )}
          >
            Street Address
          </h3>
          {errors.streetAddress && (
            <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#EC5757] mr-[1rem]">
              {errors.streetAddress.message?.toString()}
            </span>
          )}
        </div>
        <input
          {...register("streetAddress")}
          type="text"
          id="street-address"
          autoComplete="street-address"
          className={clsx(
            errors.streetAddress && props.darkMode
              ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
              : errors.streetAddress
              ? "border-[#EC5757]"
              : DarkModeStyles,
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
                  errors.city
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                City
              </h3>
              {errors.city && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#F45f] mr-[1rem]">
                  {errors.city.message?.toString()}
                </span>
              )}
            </div>
            <input
              {...register("city")}
              type="text"
              id="city"
              className={clsx(
                errors.city && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors.city
                  ? "border-[#EC5757]"
                  : DarkModeStyles,
                "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[9.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
              )}
            />
          </div>
          <div className="mb-[1.5rem]">
            <div className="flex justify-between">
              <h3
                className={clsx(
                  errors.postCode
                    ? "text-[#EC5757]"
                    : props.darkMode
                    ? "text-[#888EB0]"
                    : "text-[#7E88C3]",
                  "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
                )}
              >
                Post Code
              </h3>
              {errors.postCode && (
                <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#F45f] mr-[1rem]">
                  {errors.postCode.message?.toString()}
                </span>
              )}
            </div>
            <input
              {...register("postCode")}
              type="text"
              id="post-code"
              className={clsx(
                errors.postCode && props.darkMode
                  ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                  : errors.postCode
                  ? "border-[#EC5757]"
                  : DarkModeStyles,
                "text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[9.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
              )}
            />
          </div>
        </div>
        <div className="mb-[1.5rem]">
          <div className="flex justify-between">
            <h3
              className={clsx(
                errors.country
                  ? "text-[#EC5757]"
                  : props.darkMode
                  ? "text-[#888EB0]"
                  : "text-[#7E88C3]",
                "text-[0.9rem] leading-[1rem] tracking-[-0.00625rem] font-[500] mb-[0.6rem]"
              )}
            >
              Country
            </h3>
            {errors.country && (
              <span className="text-[0.625rem] leading-[1rem] tracking-[-0.015rem] text-[#F45f] mr-[1rem]">
                {errors.country.message?.toString()}
              </span>
            )}
          </div>
          <input
            {...register("country")}
            type="text"
            id="country"
            autoComplete="country"
            className={clsx(
              errors.country && props.darkMode
                ? "border-[#EC5757] bg-[#1E2139] placeholder:text-[#FFF] text-[#FFF]"
                : errors.country
                ? "border-[#EC5757]"
                : DarkModeStyles,
              "md:max-w-[9.5rem] text-[1rem] leading-[1rem] tracking-[-0.015rem] font-[700] mb-[0.5rem] outline-none border-[0.0625rem] max-w-[31.5rem] w-full px-[1.25rem] py-[1rem] rounded-lg"
            )}
          />
        </div>
      </div>
    </div>
  );
}
export default BillFrom;
