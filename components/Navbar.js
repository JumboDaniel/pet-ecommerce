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
import { createClient } from "@/utils/supabase/server";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { PawPrintIcon } from "./Footer";

export default async function Navbar() {
  const supabase = createClient();
  const nav = await getNavigationById("main");
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", (await supabase.auth.getUser()).data.user.id);
  const userprofile = data[0];
  // Function to get the first character of a string, handling edge cases
  function getFirstCharacter(name) {
    if (!name || typeof name !== "string") {
      return ""; // Return empty string for invalid input
    }
    return name.charAt(0).toUpperCase(); // Extract and uppercase the first character
  }
  const initial = ` ${getFirstCharacter(
    userprofile.first_name
  )} ${getFirstCharacter(userprofile.last_name)}`;
  return (
    <div className="flex items-center justify-between px-16 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <a href="/" className="flex items-center space-x-2 mb-4">
          <PawPrintIcon className="h-8 w-8 text-paws-darkblue" />
          <span className="text-2xl font-bold text-paws-darkblue">
            Paw Prints
          </span>
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
        <DropdownMenu className="w-[500px]">
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@username" src="/placeholder-user.jpg" />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>{userprofile.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href={`/profile`} className="cursor-pointer">Profile</a>
            </DropdownMenuItem>
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
