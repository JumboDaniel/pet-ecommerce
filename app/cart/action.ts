"use server";
import { revalidatePath } from "next/cache";

// utils/cart.ts
import { createClient } from "@/utils/supabase/server";

export const removeFromCart = async (userId: string, productId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("uid", userId)
    .eq("product_id", productId);
  console.log(data, error);
  if (error) {
    return { message: `Error removing from cart: ${error.message}` };
  }
  revalidatePath("/cart");
  return { message: `Deleted item` };
};

export const updateCartQuantity = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity })
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error updating cart quantity:", error.message);
  }

  return data;
};
