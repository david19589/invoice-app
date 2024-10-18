import clsx from "clsx";
import illustrationEmpty from "/src/assets/illustration-empty.svg";

function NoInvoices(props: {
  darkMode: boolean;
  setOpenNewInvoice: (status: boolean) => void;
}) {
  return (
    <div className="mt-[5rem]">
      <img
        src={illustrationEmpty}
        alt="illustrationEmpty"
        className="mb-[2.5rem]"
      />
      <div className="flex flex-col items-center">
        <h1
          className={clsx(
            props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
            "text-[1.5rem] leading-[1.4rem] tracking-[-0.05rem] font-[700] mb-[1.5rem]"
          )}
        >
          There is nothing here
        </h1>
        <div className="flex flex-col items-center">
          <h3
            className={clsx(
              props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
              "text-[0.8rem] leading-[1rem] font-[500]"
            )}
          >
            Create an invoice by clicking the
          </h3>
          <div className="flex gap-[0.3rem]">
            <button
              onClick={() => {
                props.setOpenNewInvoice(true);
              }}
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
                "text-[0.8rem] leading-[1rem] font-[700]"
              )}
            >
              New
            </button>
            <h3
              className={clsx(
                props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
                "text-[0.8rem] leading-[1rem] font-[500]"
              )}
            >
              button and get started
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoInvoices;
