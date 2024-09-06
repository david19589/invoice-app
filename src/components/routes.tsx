import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Details from "./invoices/details";

function PageRoutes(props: { darkMode: boolean }) {
  return (
    <Routes>
      <Route path="/" element={<Home darkMode={props.darkMode} />} />
      <Route
        path="/invoice/:id"
        element={<Details darkMode={props.darkMode} />}
      />
    </Routes>
  );
}

export default PageRoutes;
