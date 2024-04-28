"use client";
import { useState } from "react";
import { usePaystackPayment } from 'react-paystack';

///file import
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PAYSTACK_PUBLIC_KEY =process.env.NEXT_PAYSTACK_PUBLIC_KEY
export function Chcekout({amount,email}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} className="py-8">
      <DialogTrigger asChild>
        <Button className="w-full bg-paws-darkblue text-paws-gold">
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <CheckoutForm />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CheckoutForm() {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    instructions: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(customerInfo);
    // onSubmit(customerInfo); // Pass customer info to parent function
    // You can add additional logic here like form validation or reset
  };
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey:PAYSTACK_PUBLIC_KEY,
};
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="w-full max-w-2xl rounded-lg shadow-lg">
          <div className="bg-[#0b3339] px-6 py-4 text-[#e5f973] dark:bg-gray-800">
            <div className="text-2xl font-bold">Checkout</div>
          </div>
          <div className="grid gap-8 p-6">
            <div className="grid gap-6">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      className="w-full rounded-md border border-[#e4b1f6] px-4 py-2 text-base focus:border-[#e5f973] focus:ring-[#e5f973] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-[#e5f973]"
                      id="name"
                      placeholder="Enter your name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      className="w-full rounded-md border border-[#e4b1f6] px-4 py-2 text-base focus:border-[#e5f973] focus:ring-[#e5f973] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-[#e5f973]"
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base" htmlFor="address">
                    Address
                  </Label>
                  <Textarea
                    className="w-full rounded-md border border-[#e4b1f6] px-4 py-2 text-base focus:border-[#e5f973] focus:ring-[#e5f973] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-[#e5f973]"
                    id="address"
                    placeholder="Enter your address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base" htmlFor="instructions">
                    Special Instructions
                  </Label>
                  <Textarea
                    className="w-full rounded-md border border-[#e4b1f6] px-4 py-2 text-base focus:border-[#e5f973] focus:ring-[#e5f973] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-[#e5f973]"
                    id="instructions"
                    placeholder="Enter any special instructions"
                    name="instructions"
                    value={customerInfo.instructions}
                    onChange={handleChange}
                  />
                </div>
                <div className="bg-[#0b3339] px-6 py-4 text-[#e5f973]">
                  <Button
                    className="ml-auto bg-[#e5f973] text-[#0b3339] transition-colors"
                    size="lg"
                    type="submit"
                    variant="primary"
                  >
                    Complete Order
                  </Button>
                </div>
              </form>
            </div>
            <div className="grid gap-6 border-t border-[#e4b1f6] pt-6 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Subtotal</span>
                  <span className="text-base font-medium">$99.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Shipping</span>
                  <span className="text-base font-medium">$5.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Tax</span>
                  <span className="text-base font-medium">$8.00</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#e4b1f6] pt-4 dark:border-gray-700">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">$113.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
