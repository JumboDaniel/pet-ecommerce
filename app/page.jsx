import Hero, { FullHero } from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { getSomeProducts } from "../utils/getProducts";
import Navbar from "@/components/Navbar";

import { getPageBySlug } from "../utils/getPages";

import Image from "next/image";

export const metadata = {
  title: "Welcome to the Hygraph Shop",
};

export default async function Page({ params }) {
  const {stripes, landingPageTitle } = await getPageBySlug("/");
  const products = await getSomeProducts(4);
  // console.log("products: ", products);
  return (
    <div className="h-full">
      <header className="bg-[url(/images/dog.jpg)] bg-cover bg-center md:h-[90vh] text-white">
        <Navbar />
        {stripes &&
          stripes.map((stripe) => {
            if (stripe.__typename === "CallToAction") {
              return (
                <Hero
                  key={stripe.id}
                  title={stripe.heading}
                  description={stripe.body.raw}
                  button={{ text: stripe.button.text, url: stripe.button.url }}
                />
              );
            }
            // if (stripe.__typename === "ProductGrid") {
            //   return (
            //     <ProductGrid
            //       key={stripe.id}
            //       title={stripe.headline}
            //       products={stripe.products}
            //     />
            //   );
            // }
          })}
      </header>
      <div className="bg-paws-pink lg:py-24 py-12 px-16 md:px-44">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-paws-darkblue space-y-4">
            <h3 className="text-5xl md:text-6xl font-medium md:max-w-3xl">
              Check out our popular categories
            </h3>
            <div className="space-y-2">
              <p>Pets can be categonized into various groups</p>
              <p>Cats and dogs are also popular categories</p>
            </div>
          </div>
          <div className="flex gap-x-8 lg:gap-x-24">
            <div className="space-y-4">
              <div className="bg-paws-darkblue h-[160px] w-[160px] rounded-full">
                <Image
                  src={`/images/small-dog.jpg`}
                  width={160}
                  height={160}
                  alt="Picture of the author"
                  className="rounded-full mt-4"
                />
              </div>
              <div className="bg-white rounded-full w-full py-2 px-2 text-center font-medium text-paws-darkblue">
                Dogs
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-paws-darkblue h-[160px] w-[160px] rounded-full">
                <Image
                  src={`/images/small-dog.jpg`}
                  width={160}
                  height={160}
                  alt="Picture of the author"
                  className="rounded-full mt-4"
                />
              </div>
              <div className="bg-white rounded-full w-full py-2 px-2 text-center font-medium text-paws-darkblue">
                Dogs
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProductSection stripes={stripes}/>
      </div>
    </div>
  );
}
const ProductSection = ({ stripes }) => {
  return (
    <div>
      {stripes &&
        stripes.map((stripe) => {
          if (stripe.__typename === "ProductGrid") {
            // console.log(stripe.products)
            return (
              <ProductGrid
                key={stripe.id}
                title={stripe.headline}
                products={stripe.products}
              />
            );
          }
        })}
    </div>
  );
};
