import SidebarFreelancer from "@/Components/FreelancerCom/FreelancerSidebar";
import { RequireRole } from "@/lib/session";


export default async function FreelancerLayout({ children }) {
  await RequireRole('freelancer')
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarFreelancer />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
