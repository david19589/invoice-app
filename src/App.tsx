import { useState } from "react";
import Header from "./components/header";
import clsx from "clsx";
import Home from "./components/home";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={clsx(
        darkMode ? "bg-[#141625]" : "bg-[#F8F8FB]",
        "min-h-screen"
      )}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home darkMode={darkMode} />
    </div>
  );
}

export default App;
