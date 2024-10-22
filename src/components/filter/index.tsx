import Check from "/src/assets/icon-check.svg";
import clsx from "clsx";

type Statuses = {
  draft: boolean;
  pending: boolean;
  paid: boolean;
};

function Filter(props: {
  darkMode: boolean;
  openFilter: boolean;
  checked: Statuses;
  setChecked: (status: Statuses) => void;
}) {
  const handleCheckboxClick = (id: "draft" | "pending" | "paid") => {
    props.setChecked({ ...props.checked, [id]: !props.checked[id] });
  };

  return (
    <>
      {props.openFilter && (
        <div
          className={clsx(
            props.darkMode ? "bg-[#252945]" : "bg-[#FFF]",
            "md:translate-x-[-2rem] pr-[4.5rem] p-[1.5rem]  rounded-lg shadow-custom-shadow absolute translate-x-[-5rem] translate-y-[3rem]"
          )}
        >
          <div
            onClick={() => handleCheckboxClick("draft")}
            className="flex gap-[0.8rem] mb-[0.8rem] group cursor-pointer w-max"
          >
            <span
              className={clsx(
                props.darkMode && !props.checked.draft
                  ? "bg-[#1E2139]"
                  : props.checked.draft
                  ? "bg-[#7C5DFA]"
                  : "bg-[#DFE3FA] group-hover:border-[0.0625rem] group-hover:border-[#7C5DFA]",
                "flex w-4 h-4 rounded-sm transition-all duration-150 select-none"
              )}
            >
              {props.checked.draft && (
                <img src={Check} alt="Check" className="p-[0.2rem]" />
              )}
            </span>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "self-center text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem] select-none"
              )}
            >
              Draft
            </h2>
          </div>
          <div
            onClick={() => handleCheckboxClick("pending")}
            className="flex gap-[0.8rem] mb-[0.8rem] group cursor-pointer w-max"
          >
            <span
              className={clsx(
                props.darkMode && !props.checked.pending
                  ? "bg-[#1E2139]"
                  : props.checked.pending
                  ? "bg-[#7C5DFA]"
                  : "bg-[#DFE3FA] group-hover:border-[0.0625rem] group-hover:border-[#7C5DFA]",
                "flex w-4 h-4 rounded-sm transition-all duration-150 select-none"
              )}
            >
              {props.checked.pending && (
                <img src={Check} alt="Check" className="p-[0.2rem]" />
              )}
            </span>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "self-center text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem] select-none"
              )}
            >
              Pending
            </h2>
          </div>
          <div
            onClick={() => handleCheckboxClick("paid")}
            className="flex gap-[0.8rem] group cursor-pointer w-max"
          >
            <span
              className={clsx(
                props.darkMode && !props.checked.paid
                  ? "bg-[#1E2139]"
                  : props.checked.paid
                  ? "bg-[#7C5DFA]"
                  : "bg-[#DFE3FA] group-hover:border-[0.0625rem] group-hover:border-[#7C5DFA]",
                "flex w-4 h-4 rounded-sm transition-all duration-150 select-none"
              )}
            >
              {props.checked.paid && (
                <img src={Check} alt="Check" className="p-[0.2rem]" />
              )}
            </span>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "self-center text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem] select-none"
              )}
            >
              Paid
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
