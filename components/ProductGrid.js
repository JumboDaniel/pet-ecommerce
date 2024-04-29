import Image from "next/image";
import Main from "./Main";
import { Plus, Star } from "lucide-react";

export const Product = function ({ product }) {
  const thumbnail =
    product.productImage[0] || product.localizations[0]?.productImage[0];

  return (
    <div className="group relative">
      <a href={"/products/" + product.productSlug}>
        <div className="relative h-64 aspect-w-8 aspect-h-5 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 ">
          {thumbnail && (
            <Image
              src={thumbnail.url}
              fill={true}
              alt=""
              className="h-full w-full object-cover bg-center lg:h-full lg:w-full"
            />
          )}
        </div>
      </a>

      <div>
        <div className="flex gap-x-3 mt-3">
          {Array.from({ length: 3 }).map((_, index) => {
            return <Star fill="#fc8507" color="transparent" />;
          })}
          {Array.from({ length: 2 }).map((_, index) => {
            return <Star color="#fc8507" />;
          })}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <div>
            <h3 className="text-sm text-gray-700">
              <a
                href={"/products/" + product.productSlug}
                className="text-paws-darkblue font-medium"
              >
                {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                {product.productName}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${product.productPrice}
          </p>
        </div>
        <div>
          <button
            aria-label="add to cart"
            title="add to cart"
            className="bg-paws-gold w-8 h-8 rounded-full"
          >
            <Plus color="#0b3339" className="mx-auto" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductGrid({ products, title }) {
  return (
    <Main>
      <div className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-44 xl:mt-28">
        {title && (
          <h2 className="text-5xl font-medium tracking-tight text-paws-darkblue text-center">
            {title}
          </h2>
        )}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Main>
  );
}
