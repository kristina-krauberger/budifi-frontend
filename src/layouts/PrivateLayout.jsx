import HeaderPrivate from "../components/HeaderPrivate/HeaderPrivate";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export default function PrivateLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPrivate /> {/* später ersetzt durch UserHeaderPrivate */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
