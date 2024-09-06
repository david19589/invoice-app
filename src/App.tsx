import { useState } from "react";
import Header from "./components/header";
import clsx from "clsx";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/routes";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={clsx(
          darkMode ? "bg-[#141625]" : "bg-[#F8F8FB]",
          "min-h-screen"
        )}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <PageRoutes darkMode={darkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
