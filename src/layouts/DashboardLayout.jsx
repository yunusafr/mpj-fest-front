import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header />

        <main className="p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}