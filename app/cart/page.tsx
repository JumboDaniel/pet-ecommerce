import Link from "next/link";
import { ArrowRight, Trash } from "lucide-react";
///file import
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { getProductById } from "@/utils/getProducts";
import { CurrencyFormatter } from "@/utils/currencyFormatter";
import { EmptyCart } from "@/components/emptystate/emptycart";
import { RemoveFromCart } from "@/components/cart/removefromCart";
import { Chcekout } from "@/components/cart/checkcout";
import { redirect } from "next/navigation";

type Product = {
  id: string;
  productName: string;
  productPrice: number;
  productSlug: string;
  productImage: [url: string];
};

type Item = {
  product_id: string;
  quantity: number;
  product?: Product;
};
export default async function CartPage() {
  const supabase = createClient();
  const { data: userdata, error } = await supabase.auth.getUser();

  const { data: cart, error: carterror } = await supabase
    .from("cart")
    .select("*")
    .eq("uid", userdata.user?.id);
  async function getCartItemsWithDetails() {
    if (!cart || cart.length <= 0) return [];
    const cartItems = await Promise.all(
      cart.map(async (item) => {
        const product = await getProductById(item.product_id);
        return { ...item, ...product }; // Merge cart item and product details
      })
    );
    return cartItems;
  }
  const totalCartItems = await getCartItemsWithDetails();
  const totalAmount = totalCartItems?.reduce(
    (accumulator, currentItem) => {
      const subtotal = accumulator.subtotal + currentItem.productPrice;
      const taxRate = 0.08; // Assuming 8% tax rate, adjust as needed
      const tax = Math.round(subtotal * taxRate);
      const total = subtotal + tax;
      return {
        ...accumulator,
        subtotal,
        tax,
        total,
      };
    },
    {
      subtotal: 0,
      tax: 0,
      total: 0,
    }
  );
  if (error || !userdata?.user) {
    redirect("/login");
  }
  if (!cart || cart.length <= 0) {
    return (
      <div className="min-h-[500px] py-24">
        <EmptyCart />
      </div>
    );
  }
  //   }
  return (
    <div className="flex flex-col">
      <main className="flex-1 py-6 lg:py-12">
        <div className="max-w-4xl mx-auto px-6 grid gap-6 lg:gap-12">
          <div className="grid gap-2">
            <h1 className="font-semibold text-3xl">Shopping Cart</h1>
            <p className="text-gray-500">
              You have {totalCartItems.length} items in your cart
            </p>
          </div>
          <div className="grid gap-6">
            {totalCartItems?.map((item, index) => {
              return (
                <div
                  className="grid md:grid-cols-[100px_1fr_130px] justify-between items-start gap-4"
                  key={index}
                >
                  {/* grid-cols-[100px_1fr_200px_100px_100px] */}
                  <img
                    alt={item.productName}
                    className="aspect-square rounded-lg object-cover sm:w-100%"
                    height="160"
                    src={item?.productImage?.[0]?.url}
                    width="160"
                  />
                  <div className="grid gap-1">
                    <h2 className="font-semibold text-lg md:text-base">
                      {item.productName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      SKU: {item?.product_id}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm md:text-base">
                      {CurrencyFormatter(item?.productPrice)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Label className="sr-only" htmlFor="quantity">
                          Quantity
                        </Label>

                        <Select
                          //@ts-expect-error
                          className="w-20"
                          id="quantity"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Select>
                      </div>
                      <RemoveFromCart
                        uid={userdata.user?.id}
                        product_id={item?.product_id}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* checkout section */}
          <div className="grid gap-4">
            <div className="grid gap-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <div>Subtotal</div>
                  <div className="text-right">
                    {CurrencyFormatter(totalAmount.subtotal)}
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <div>Tax</div>
                  <div className="text-right">
                    {CurrencyFormatter(totalAmount.tax)}
                  </div>
                </div>
                <Separator className="h-px border-gray-200 dark:border-gray-800" />
                <div className="grid grid-cols-2 items-center font-semibold gap-2">
                  <div>Total</div>
                  <div className="text-right">
                    {CurrencyFormatter(totalAmount.total)}
                  </div>
                </div>
                <Chcekout email={userdata.user?.email} amount={totalAmount} />
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
