import clsx from "clsx";
import data from "../../data.json";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "/src/assets/icon-arrow-left.svg";

function Details(props: { darkMode: boolean }) {
  const { id } = useParams();
  const invoiceId = id ? id : "";
  const invoiceObj = data.find(
    (invoice) => invoice.id.toString() === invoiceId
  );

  return (
    <div className="flex justify-center">
      {invoiceObj && (
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
                invoiceObj.status === "paid" && "bg-[#33d6a018]",
                invoiceObj.status === "pending" && "bg-[#ff910018]",
                invoiceObj.status === "draft" &&
                  (props.darkMode ? "bg-[#dfe3fa15]" : "bg-[#373b5311]"),
                "flex justify-center items-baseline w-[6.5rem] py-[0.9rem] rounded-lg"
              )}
            >
              <span
                className={clsx(
                  invoiceObj.status === "paid" && "bg-[#33D69F]",
                  invoiceObj.status === "pending" && "bg-[#FF8F00]",
                  invoiceObj.status === "draft" &&
                    (props.darkMode ? "bg-[#DFE3FA]" : "bg-[#373B53]"),
                  "flex w-[0.5rem] h-[0.5rem] rounded-full mr-[0.5rem]"
                )}
              ></span>
              <h2
                className={clsx(
                  invoiceObj.status === "paid" && "text-[#33D69F]",
                  invoiceObj.status === "pending" && "text-[#FF8F00]",
                  invoiceObj.status === "draft" &&
                    (props.darkMode ? "text-[#DFE3FA]" : "text-[#373B53]"),
                  "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                )}
              >
                {invoiceObj.status.charAt(0).toUpperCase() +
                  invoiceObj.status.slice(1)}
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
                    {invoiceObj.id}
                  </h2>
                </div>
                <h3
                  className={clsx(
                    props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                    "text-[0.8rem] leading-[1rem] font-[500] mb-[2rem]"
                  )}
                >
                  {invoiceObj.description}
                </h3>
                <div>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {invoiceObj.senderAddress.street}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {invoiceObj.senderAddress.city}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {invoiceObj.senderAddress.postCode}
                  </h3>
                  <h3
                    className={clsx(
                      props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                      "text-[0.8rem] leading-[1rem] font-[500]"
                    )}
                  >
                    {invoiceObj.senderAddress.country}
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
                      {invoiceObj.createdAt}
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
                      {invoiceObj.paymentDue}
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
                    {invoiceObj.clientAddress.street}
                  </h2>
                  <div>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                        "text-[0.8rem] leading-[1rem] font-[500]"
                      )}
                    >
                      {invoiceObj.clientAddress.street}
                    </h3>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                        "text-[0.8rem] leading-[1rem] font-[500]"
                      )}
                    >
                      {invoiceObj.clientAddress.city}
                    </h3>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                        "text-[0.8rem] leading-[1rem] font-[500]"
                      )}
                    >
                      {invoiceObj.clientAddress.postCode}
                    </h3>
                    <h3
                      className={clsx(
                        props.darkMode ? "text-[#DFE3FA]" : "text-[#7E88C3]",
                        "text-[0.8rem] leading-[1rem] font-[500]"
                      )}
                    >
                      {invoiceObj.clientAddress.country}
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
                  {invoiceObj.clientEmail}
                </h2>
              </div>
            </div>
            <div
              className={clsx(
                props.darkMode ? "bg-[#252945]" : "bg-[#F9FAFE]",
                "p-[1.5rem] rounded-lg"
              )}
            >
              {invoiceObj.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-[1.5rem]"
                >
                  <div>
                    <h2
                      className={clsx(
                        props.darkMode ? "text-[#FFF]" : "text-[#000]",
                        "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700] mb-[0.5rem]"
                      )}
                    >
                      {item.name}
                    </h2>
                    <div className="flex items-baseline gap-[0.3rem]">
                      <h2
                        className={clsx(
                          props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                        )}
                      >
                        {item.quantity}
                      </h2>
                      <span
                        className={clsx(
                          props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                        )}
                      >
                        x
                      </span>
                      <h2
                        className={clsx(
                          props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                          "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                        )}
                      >
                        £{item.price}
                      </h2>
                    </div>
                  </div>
                  <h2
                    className={clsx(
                      props.darkMode ? "text-[#FFF]" : "text-[#7E88C3]",
                      "text-[1rem] leading-[1rem] tracking-[0.015rem] font-[700]"
                    )}
                  >
                    £{item.total}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
