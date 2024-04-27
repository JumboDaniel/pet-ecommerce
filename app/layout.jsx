import Base from "../components/layouts/Base";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Base>{children}</Base>
        <Toaster />
      </body>
    </html>
  );
}
