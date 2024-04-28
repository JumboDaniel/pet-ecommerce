import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lgrounded-md bg-white p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Your Cart is Empty</h2>
              <p className="text-paws-darkblue text-xl">
                Looks like you haven't added any items to your cart yet. Let's
                change that!
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                className="flex gap-x-2 items-center rounded-full bg-paws-gold py-2 px-4 text-paws-darkblue shadow-sm hover:bg-paws-gold/80 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 transition-all"
                href={`/`}
                aria-label="link to home"
              >
                Continue Shopping <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
