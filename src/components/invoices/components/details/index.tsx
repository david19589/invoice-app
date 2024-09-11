import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "/src/assets/icon-arrow-left.svg";
import { Invoice } from "../../../utils/invoice-types";
import ItemsTable from "../items-table";

function Details(props: {
  darkMode: boolean;
  invoice: Invoice[];
  status: string;
}) {
  const { id } = useParams();
  const invoiceIdNumber = Number(id);

  const selectedInvoice = props.invoice.find(
    (item) => item["invoice-id"] === invoiceIdNumber
  );
  
  if (!selectedInvoice) {
    return <div>Invoice not found.</div>;
  }

  const formattedDate = new Date(
    selectedInvoice["invoice-date"]
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  
  const formattedPayment = new Date(
    selectedInvoice["payment-due"]
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex justify-center">
      <div className="p-[1.5rem] max-w-[45.625rem] w-full">
        <Link to="/">
          <button className="flex items-baseline gap-[1rem] mb-[2rem]">
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
        </Link>
        <div
          className={clsx(
            props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
            "flex justify-between items-center p-[1.5rem] w-full rounded-lg shadow-custom-shadow-2 mb-[1rem]"
          )}
        >
          <h2
            className={clsx(
              props.darkMode ? "text-[#DFE3FA]" : "text-[#888EB0]",
              "text-[0.8rem] leading-[1rem] font-[500]"
            )}
          >
            Status
          </h2>
          <div
            className={clsx(
              props.status === "paid" && "bg-[#33d6a018]",
              props.status === "pending" && "bg-[#ff910018]",
              props.status === "draft" &&
                (props.darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
              "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
            )}
          >
            <span
              className={clsx(
                props.status === "paid" && "bg-[#33D69F]",
                props.status === "pending" && "bg-[#FF8F00]",
                props.status === "draft" &&
                  (props.darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
              )}
            ></span>
            <h2
              className={clsx(
                props.status === "paid" && "text-[#33D69F]",
                props.status === "pending" && "text-[#FF8F00]",
                props.status === "draft" &&
                  (props.darkMode ? "text-[#DFE3FA]" : "text-[#373B53]"),
                "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
              )}
            >
              {props.status}
            </h2>
          </div>
        </div>
        <div
          className={clsx(
            props.darkMode ? "bg-[#1E2139]" : "bg-[#FFF]",
            "flex flex-col p-[1.5rem] w-full rounded-lg shadow-custom-shadow-2 mb-[1rem]"
          )}
        >
          <div className="mb-[2rem]">
            <div className="mb-[2rem]">
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
                  {selectedInvoice["invoice-id"]}
                </h2>
              </div>
              <h3
                className={clsx(
                  props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                  "text-[0.8rem] leading-[1rem] font-[500] mb-[2rem]"
                )}
              >
                {selectedInvoice["project-description"]}
              </h3>
              <div>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500]"
                  )}
                >
                  {selectedInvoice["street-address"]}
                </h3>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500]"
                  )}
                >
                  {selectedInvoice.city}
                </h3>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500]"
                  )}
                >
                  {selectedInvoice["post-code"]}
                </h3>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500]"
                  )}
                >
                  {selectedInvoice.country}
                </h3>
              </div>
            </div>
            <div className="flex justify-between gap-[0.5rem] mb-[2rem]">
              <div>
                <div className="mb-[2rem]">
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                    )}
                  >
                    Invoice Date
                  </h3>
                  <h2
                    className={clsx(
                      props.darkMode ? "text-[#FFF]" : "text-[#000]",
                      "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                    )}
                  >
                    {formattedDate}
                  </h2>
                </div>
                <div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                    )}
                  >
                    Payment Due
                  </h3>
                  <h2
                    className={clsx(
                      props.darkMode ? "text-[#FFF]" : "text-[#000]",
                      "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                    )}
                  >
                    {formattedPayment}
                  </h2>
                </div>
              </div>
              <div>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                  )}
                >
                  Bill To
                </h3>
                <h2
                  className={clsx(
                    props.darkMode ? "text-[#FFF]" : "text-[#000]",
                    "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem]"
                  )}
                >
                  {selectedInvoice["clients-name"]}
                </h2>
                <div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {selectedInvoice["clients-street-address"]}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {selectedInvoice["clients-city"]}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {selectedInvoice["clients-post-code"]}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {selectedInvoice["clients-country"]}
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <h3
                className={clsx(
                  props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                  "text-[0.8rem] leading-[1rem] font-[500] mb-[0.8rem]"
                )}
              >
                Sent to
              </h3>
              <h2
                className={clsx(
                  props.darkMode ? "text-[#FFF]" : "text-[#000]",
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                )}
              >
                {selectedInvoice["clients-email"]}
              </h2>
            </div>
          </div>
          <div
            className={clsx(
              props.darkMode ? "bg-[#252945]" : "bg-[#F9FAFE]",
              "p-[1.5rem] rounded-lg"
            )}
          >
            <ItemsTable darkMode={props.darkMode} invoice={props.invoice} selectedInvoice={selectedInvoice}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
