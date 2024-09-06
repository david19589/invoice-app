import clsx from "clsx";
import data from "../data.json";
import { Link } from "react-router-dom";

function Invoices(props: { darkMode: boolean }) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index} className="max-w-[45.625rem] w-full">
            <Link to={`/invoice/${item.id}`}>
              <div
                className={clsx(
                  props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
                  "p-[1.5rem] rounded-lg mb-[1rem] max-w-[45.625rem] w-full cursor-pointer"
                )}
              >
                <div className="flex justify-between items-center mb-[1.5rem]">
                  <div className="flex">
                    <span className="text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] text-[#7E88C3]">
                      #
                    </span>
                    <h2
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      {item.id}
                    </h2>
                  </div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#FFF]" : "text-[#858BB2]",
                      "text-[0.813rem] leading-[1rem] tracking-[0.007rem] font-[500]"
                    )}
                  >
                    {item.clientName}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#858BB2]",
                        "text-[0.813rem] leading-[1rem] tracking-[0.007rem] font-[500] mb-[0.6rem]"
                      )}
                    >
                      Due {item.paymentDue}
                    </h3>
                    <h2
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      £ {item.total}
                    </h2>
                  </div>
                  <div
                    className={clsx(
                      item.status === "paid" && "bg-[#33d6a018]",
                      item.status === "pending" && "bg-[#ff910018]",
                      item.status === "draft" &&
                        (props.darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
                      "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
                    )}
                  >
                    <span
                      className={clsx(
                        item.status === "paid" && "bg-[#33D69F]",
                        item.status === "pending" && "bg-[#FF8F00]",
                        item.status === "draft" &&
                          (props.darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                        "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
                      )}
                    ></span>
                    <h2
                      className={clsx(
                        item.status === "paid" && "text-[#33D69F]",
                        item.status === "pending" && "text-[#FF8F00]",
                        item.status === "draft" &&
                          (props.darkMode
                            ? "text-[#DFE3FA]"
                            : "text-[#373B53]"),
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                      )}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default Invoices;
