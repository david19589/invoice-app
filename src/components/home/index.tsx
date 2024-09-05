import { useState } from "react";
import ArrowDown from "/src/assets/icon-arrow-down.svg";
import Plus from "/src/assets/icon-plus.svg";

import clsx from "clsx";
import Filter from "../filter";
import Invoices from "../invoices";

function Home(props: { darkMode: boolean }) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center p-[1.5rem] w-full">
      <div className="flex flex-row justify-between items-center max-w-[45.625rem] w-full mb-[2rem]">
        <div>
          <h2
            className={clsx(
              props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
              "text-[1.5rem] leading-[1.4rem] font-[700] tracking-[-0.05rem]"
            )}
          >
            Invoices
          </h2>
          <h3
            className={clsx(
              props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
              "text-[0.8rem] leading-[1rem] font-[500] tracking-[-0.01rem]"
            )}
          >
            7 invoices
          </h3>
        </div>
        <div className="md:gap-[3rem] flex gap-[1.2rem]">
          <div
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
            className="flex items-center gap-[0.8rem] cursor-pointer select-none"
          >
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "md:hidden text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem]"
              )}
            >
              Filter
            </h2>
            <h2
              className={clsx(
                props.darkMode ? "text-[#FFF]" : "text-[#0C0E16]",
                "md:flex hidden text-[1rem] leading-[1rem] font-[700] tracking-[-0.02rem]"
              )}
            >
              Filter by status
            </h2>
            <img
              src={ArrowDown}
              alt="Arrow"
              className={clsx(openFilter && "rotate-180")}
            />
          </div>
          <Filter openFilter={openFilter} darkMode={props.darkMode} />
          <button className="md:hidden flex items-center text-[1rem] leading-[1rem] font-[700] text-[#FFF] pr-[1rem] p-[0.38rem] bg-[#7C5DFA] rounded-full select-none">
            <img
              src={Plus}
              alt="Plus"
              className="bg-[#FFF] p-[0.7rem] mr-[0.5rem] rounded-full "
            />
            New
          </button>
          <button className="md:flex hidden items-center text-[1rem] leading-[1rem] font-[700] text-[#FFF] pr-[1rem] p-[0.38rem] bg-[#7C5DFA] rounded-full select-none">
            <img
              src={Plus}
              alt="Plus"
              className="bg-[#FFF] p-[0.7rem] mr-[0.5rem] rounded-full "
            />
            New Invoice
          </button>
        </div>
      </div>
      <Invoices />
    </div>
  );
}

export default Home;
