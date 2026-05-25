import HeaderPublic from "../../components/HeaderPublic/HeaderPublic";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F2]">
      <HeaderPublic />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}