import data from "../data.json";

function Invoices() {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-[#FFF] p-[1.5rem] rounded-lg mb-[1rem] max-w-[45.625rem] w-full"
          >
            <div className="flex justify-between items-center mb-[1.5rem]">
              <div className="flex">
                <span>#</span>
                <h2>{item.id}</h2>
              </div>
              <h3>{item.clientName}</h3>
            </div>
            <div>
              <h3>{item.paymentDue}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Invoices;
