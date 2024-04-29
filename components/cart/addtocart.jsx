"use client";
import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addToCart } from "@/utils/cartService";
import { LoadingOverlay } from "@/components/loading";

export const AddtoCart = ({ product }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const handleAddToCart = async (productId) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to use the cart",
        variant: "destructive",
        action: (
          <ToastAction altText="Login">
            <Link href={`/auth/login`}>Login</Link>
          </ToastAction>
        ),
      });
    } else {
      setIsLoading((prev) => !prev);
      const cartAddition = await addToCart(data.user?.id, productId, 1);
      setIsLoading((prev) => !prev);
      toast({
        title: "Success",
        description: "Added item to cart",
      });
    }
  };
  return (
    <div>
      <LoadingOverlay isLoading={isLoading} />
      <button
        type="submit"
        onClick={() => handleAddToCart(product?.id)}
        className="flex items-center justify-center w-[350px] px-8 py-3 my-10 
      text-base font-medium text-white bg-paws-darkblue border border-transparent rounded-md 
      hover:bg-paws-darkblue/80 md:py-4 md:px-10 md:text-lg cursor-pointer transition-all focus:ring-offset-2"
      >
        Add to cart
      </button>
    </div>
  );
};
