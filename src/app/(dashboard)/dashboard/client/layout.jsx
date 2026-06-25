import SidebarClient from "@/Components/ClientCom/SidebarClient";
import { RequireRole } from "@/lib/session";

export default async function ClientLayout({ children }) {
  await RequireRole("client");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarClient />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
// 
