"use client";
import { useState } from "react";
////
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { removeFromCart } from "@/app/cart/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { LoadingOverlay } from "@/components/loading";
const initialState = {
  message: "",
};
export const RemoveFromCart = ({ uid, product_id }) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveFromCart = async () => {
    setIsLoading((prev) => !prev);
    removeFromCart(uid, product_id)
      .then((res) => {
        setIsLoading((prev) => !prev);
        toast({
          title: "Success",
          description: res.message,
        });
      })
      .catch((error) => {
        setIsLoading((prev) => !prev);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          action: <ToastAction altText="retry">Try Again</ToastAction>,
        });
      });
  };
  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Button
        size="sm"
        variant="outline"
        title="delete item from cart"
        aria-label="delete item"
        className="bg-[#0b3339]"
        onClick={handleRemoveFromCart}
      >
        <Trash className="h-3 w-3" color="#e5f973"/>
        <span className="sr-only">Remove</span>
      </Button>
    </>
  );
};
