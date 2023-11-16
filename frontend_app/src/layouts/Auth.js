import { Outlet } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Outlet />
          {/* <Routes>
            <Route path="/auth/login" exact component={<Login />} />
            <Route path="/auth/register" exact component={<Register />} />
            <Route
              path="/auth"
              exact
              element={<Navigate to="/auth/login" replace />}
            />
          </Routes> */}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
