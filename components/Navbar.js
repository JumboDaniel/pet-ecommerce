import { ShoppingCart, User } from "lucide-react";
import { getNavigationById } from "../utils/getNavigation";
import Main from "./Main";
import MobileNav from "./MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default async function Navbar() {
  const nav = await getNavigationById("main");

  return (
    <div className="flex items-center justify-between px-16 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <a href="/">
          <span className="sr-only">Hygraph Commerce</span>
          <img className="h-8 w-auto sm:h-10" src="/logo.svg" alt="" />
        </a>
      </div>
      <div className="-my-2 -mr-2 md:hidden">
        {/* <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button> */}
      </div>

      <div className="hidden items-center gap-x-12 justify-end md:flex md:flex-1 lg:w-0">
        {nav.navLink.map((link) => (
          <a
            key={link.id}
            href={link.url ? link.url : "/en/" + link.page.url}
            className="text-base font-medium"
          >
            {link.displayText}
          </a>
        ))}
        <a href="/cart" className="text-base  font-medium">
          <ShoppingCart />
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:hidden">
        <MobileNav nav={nav} />
      </div>
    </div>
  );
}
