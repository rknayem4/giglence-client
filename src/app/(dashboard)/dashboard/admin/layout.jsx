import SidebarAdmin from "@/Components/AdminCom/SidebarAdmin";
import { RequireRole } from "@/lib/session";

export default async function AdminLayout({ children }) {
  await RequireRole("admin");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarAdmin />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
