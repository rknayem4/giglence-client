import SidebarAdmin from "@/Components/AdminCom/SidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SidebarAdmin />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
