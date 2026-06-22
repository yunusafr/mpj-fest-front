import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function PublicLayout() {
  const location = useLocation();

  const noLayoutRoutes = ["/v", "/v/"];

  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path),
  );

  if (hideLayout) {
    return <Outlet />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
