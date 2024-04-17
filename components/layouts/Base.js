import Footer from "../Footer";
// import Main from '../Main'
import Alert from "../PreviewAlert";
import { cookies, draftMode } from "next/headers";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Base({ children }) {
  const preview = draftMode().isEnabled;
  return (
    <main className={`${inter.className}`}>
      {preview && <Alert preview={preview} slug="myslug" model="products" />}
      {children}
      <Footer />
    </main>
  );
}
