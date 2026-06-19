import SidebarFreelancer from "@/Components/FreelancerCom/FreelancerSidebar";


export default function FreelancerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarFreelancer />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
