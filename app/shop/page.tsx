import ProductGrid, { Product } from "@/components/ProductGrid";
import { ProductFilterComponent } from "@/components/shop/shopfilter";
import { allProductsWithFilter } from "@/utils/getProducts";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams?.search || "";
  const minPrice = searchParams?.minPrice
    ? //@ts-expect-error
      parseFloat(searchParams?.minPrice || "")
    : undefined;
  const maxPrice = searchParams?.maxPrice
    ? //@ts-expect-error
      parseFloat(searchParams?.maxPrice || "")
    : undefined;
  const category = searchParams?.category || "";

  const products = await allProductsWithFilter(
    search,
    minPrice,
    maxPrice,
    category
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <ProductFilterComponent />
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {
          //@ts-expect-error
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
}
