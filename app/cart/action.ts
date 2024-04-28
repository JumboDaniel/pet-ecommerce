"use server"

// utils/cart.ts
import { createClient } from '@/utils/supabase/server';

export const removeFromCart = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from cart:', error.message);
  }

  return data;
};

export const updateCartQuantity = async (userId: string, productId: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error updating cart quantity:', error.message);
  }

  return data;
};