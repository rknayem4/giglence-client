import SidebarClient from "@/Components/ClientCom/SidebarClient";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ClientLayout({ children }) {
  const user = await getUser();

  // 1. Guard check: If there is no session at all, kick them to login first
  if (!user) {
    redirect("/auth/login");
  }

  // 2. Authorization checks: Since we confirmed user exists, we can safely check roles
  if (user.role === "freelancer") {
    redirect("/dashboard/freelancer");
  }

  if (user.role === "admin") {
    redirect("/dashboard/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarClient />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
