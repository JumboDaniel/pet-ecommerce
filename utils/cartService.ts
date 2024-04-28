import { createClient } from "@/utils/supabase/client";

export const addToCart = async (
  userId: string,
  product_id: string,
  quantity: number
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cart")
    .insert([{ uid: userId, product_id: product_id, quantity }]);

  if (error) {
    console.error("Error adding to cart:", error.message);
    return "Error adding to cart";
  }
  return data;
};
