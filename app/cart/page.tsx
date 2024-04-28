import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function CartPage() {
  const supabase = createClient();
  const { data: userdata, error } = await supabase.auth.getUser();
  //   if (error || !data?.user) {
  //     redirect('/login')
  //   }
  const { data: cart, error: carterror } = await supabase
    .from("cart")
    .select("*")
    .eq("uid", userdata.user?.id);
  console.log(cart, carterror);
  return (
    <div className="flex flex-col">
      <main className="flex-1 py-6 lg:py-12">
        <div className="max-w-5xl mx-auto px-6 grid gap-6 lg:gap-12">
          <div className="grid gap-2 items-center justify-center">
            <h1 className="font-semibold text-3xl">Shopping Cart</h1>
            <p className="text-gray-500">You have 3 items in your cart</p>
          </div>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-[100px_1fr_200px_100px_100px] justify-between items-start gap-4">
              <img
                alt="Dog food"
                className="aspect-square rounded-lg object-cover sm:w-100%"
                height="160"
                src="/placeholder.svg"
                width="160"
              />
              <div className="grid gap-1">
                <h2 className="font-semibold text-lg md:text-base">
                  Dog Food - Bacon Flavor
                </h2>
                <p className="text-sm text-gray-500">SKU: 9384957</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-sm md:text-base">$14.99</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Label className="sr-only" htmlFor="quantity">
                      Quantity
                    </Label>
                    <Select className="w-20" id="quantity">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Select>
                  </div>
                  <Button size="xs" variant="outline">
                    <TrashIcon className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* checkout section */}
          <div className="grid gap-4">
            <div className="grid gap-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <div>Subtotal</div>
                  <div className="text-right">$44.97</div>
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <div>Tax</div>
                  <div className="text-right">$4.50</div>
                </div>
                <Separator className="h-px border-gray-200 dark:border-gray-800" />
                <div className="grid grid-cols-2 items-center font-semibold gap-2">
                  <div>Total</div>
                  <div className="text-right">$49.47</div>
                </div>
                <Button className="w-full" type="submit">
                  Proceed to Checkout
                </Button>
              </form>
              <div className="flex items-center justify-center">
                <Link
                  href={`/products`}
                  className="underline underline-offset-4 text-center"
                >
                  {" "}
                  or Continue Shopping
                </Link>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
