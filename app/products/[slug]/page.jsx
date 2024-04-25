// Product detail pages generated from utils/getProducts.js
// Path: /pages/products/[slug].js
import React from "react";
import { getProductBySlug } from "@/utils/getProducts";
import Review from "@/components/Review";
import Stars from "@/components/Stars";
import ImageGroup from "@/components/ImageGroup";
import Main from "../../../components/Main";
import { draftMode } from "next/headers";
import Alert from "../../../components/PreviewAlert";
import { CurrencyFormatter } from "@/utils/currencyFormatter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default async function Page({ params }) {
  const preview = draftMode().isEnabled;
  const product = await getProductBySlug(params.slug, preview);
  const reviews = product?.reviews?.data;
  const imagesArray = product?.productImage;
  const shipping = [
    "Free shipping on orders over $300",
    "International shipping available",
    "Expedited shipping options",
    "Signature required upon delivery",
  ];
  const returns = [
    "Easy return requests",
    "Pre-paid shipping label included",
    "10% restocking fee for returns",
    "60 day return window",
  ];
  console.log(product?.productImage);

  return (
    <div className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-44 xl:mt-28 h-full">
      <Main>
        <div className="grid md:grid-cols-[minmax(200px,1fr)_1fr] my-10 gap-3">
          <div className="h-[20px] p-4 bg-gray-50">
            {/* {product?.productImage && (
              <ImageGroup images={product?.productImage} />
            )} */}
            <div className="flex flex-wrap gap-x gap-y-2">
            {product?.productImage &&
              product.productImage.map((image, index) => {
                return (
                  <Image
                    alt={image?.altText}
                    src={image?.url}
                    width={800}
                    height={1200}
                    key={index}
                    className={`${index === 0 ?'order-1 md:order-0 w-full'? index === 1:'order-2 md:order-1 w-1/2' : 'order-3 md:order-2  w-1/2'} w`}
                  />
                );
              })}
            </div>

          </div>

          <div className="pl-2 space-y-4 lg:max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-paws-darkblue sm:text-5xl">
              {product?.productName}
            </h1>
            {/* Options */}
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl lg:text-4xl tracking-tight text-paws-darkblue">
              {CurrencyFormatter(product?.productPrice)}
            </p>
            {/* Reviews */}
            <div className="flex items-center">
              <Stars rating={4} />
            </div>
            <div>
              {/* Description and details */}
              <h3 className="font-medium py-4">Description</h3>
              <div
                className="mb-10"
                dangerouslySetInnerHTML={{
                  __html: product?.productDescription.html,
                }}
              ></div>
            </div>
            <Accordion type="multiple" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Reviews</AccordionTrigger>
                <AccordionContent>
                  {reviews?.length > 0 && (
                    <>
                      <h3
                        id="reviews"
                        className="text-2xl font-bold tracking-tight text-gray-900"
                      >
                        Reviews
                      </h3>
                      <div className="grid grid-cols-1 divide-y">
                        {reviews.map((review) => (
                          <Review key={review.id} review={review} />
                        ))}
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>
                  <ul className="p-2 list-disc space-y-2">
                    {shipping.map((item, index) => (
                      <li className="gap-x-2" key={index}>
                        <span className="font-semibold">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                  <ul className="p-2 list-disc space-y-2">
                    {returns.map((item, index) => (
                      <li className="gap-x-2" key={index}>
                        <span className="font-semibold">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <button
              type="submit"
              className="flex items-center justify-center w-[350px] px-8 py-3 my-10 
              text-base font-medium text-white bg-paws-darkblue border border-transparent rounded-md 
              hover:bg-paws-darkblue/80 md:py-4 md:px-10 md:text-lg cursor-pointer transition-all focus:ring-offset-2"
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="">
          {reviews?.length > 0 && (
            <>
              <h3
                id="reviews"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Reviews
              </h3>
              <div className="grid grid-cols-1 divide-y">
                {reviews.map((review) => (
                  <Review key={review.id} review={review} />
                ))}
              </div>
            </>
          )}
        </div>
      </Main>
    </div>
  );
}
