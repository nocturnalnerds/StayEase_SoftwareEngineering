import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div>
      <Navbar isFixed />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
