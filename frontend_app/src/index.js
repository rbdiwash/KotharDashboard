import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";

// layouts
import { StrictMode } from "react";


// views without layouts

import App from "./App";
import "./input.css";
// import "./assets/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <BrowserRouter>
  //   <ToastContainer />
  //   <Routes>
  //     {/* add routes with layouts */}
  //     <Route path="/admin" element={<Admin />}></Route>
  //     <Route path="/auth" element={<Auth />} />

  //     {/* add routes without layouts */}
  //     <Route path="/landing" exact element={<Landing />} />
  //     <Route path="/profile" exact element={<Profile />} />
  //     <Route path="/" exact element={<Index />} />
  //     {/* add redirect for first page */}
  //     {/* <Redirect from="*" to="/" /> */}
  //   </Routes>
  // </BrowserRouter>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
