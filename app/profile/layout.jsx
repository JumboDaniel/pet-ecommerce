import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="border-b lg:px-8 !text-paws-darkblue">
        <Navbar />
      </div>
      {children}
    </>
  );
}
