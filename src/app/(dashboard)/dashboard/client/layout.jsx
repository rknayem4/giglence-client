import SidebarClient from "@/Components/ClientCom/SidebarClient";
import { getUser, RequireRole } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ClientLayout({ children }) {
  const user = await getUser();
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
