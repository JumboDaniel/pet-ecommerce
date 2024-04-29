// Desc: Footer component for the website

import Link from "next/link";
import navigation from "../utils/getNavigation";
export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0b3339] text-white py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start">
          <Link className="flex items-center space-x-2 mb-4" href="#">
            <PawPrintIcon className="h-8 w-8 text-[#e5f973]" />
            <span className="text-2xl font-bold text-[#e5f973]">Paw Prints</span>
          </Link>
          <p className="text-gray-400 text-sm">Discover the best pet products for your furry friends at Paw Prints.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#e5f973]">Quick Links</h4>
          <div className="grid grid-cols-2 gap-4">
            <nav className="flex flex-row md:flex-col space-y-2">
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                Home
              </Link>
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                Shop
              </Link>
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                About
              </Link>
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                Contact
              </Link>
            </nav>
            <nav className="flex flex-row md:flex-col space-y-2">
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                FAQ
              </Link>
              <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
                Blog
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4 text-[#e5f973]">Follow Us</h4>
          <div className="flex items-center space-x-4">
            <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link className="text-gray-400 hover:text-[#e5f973] transition-colors" href="#">
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-400">
        © 2024 Paw Prints. All rights reserved.
      </div>
    </footer>
  );
}


function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


export function PawPrintIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
