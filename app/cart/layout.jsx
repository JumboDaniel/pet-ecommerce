import Navbar from "@/components/Navbar";
export default function Layout({ children }) {
  return (
    <div>
      <div className="border-b lg:px-8 !text-paws-darkblue mb-12">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
