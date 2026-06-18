import Footer from "@/Components/Shared/Footer";
import NavBer from "@/Components/Shared/NavBer";


export default function PublicLayout({ children }) {
  return (
    <>
      <NavBer />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}