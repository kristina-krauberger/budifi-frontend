import HeaderPublic from "../components/HeaderPublic/HeaderPublic";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPublic />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}