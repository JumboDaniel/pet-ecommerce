///
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { CurrencyFormatter } from "@/utils/currencyFormatter";

import { BookingForm } from "@/components/services/bookingform";
import { transformedData } from "@/components/services/transformdata";

interface Service {
    service_id: number;
    name: string;
    service: string;
    location: string;
    description: string;
    images: string[]; // Array of image URLs
    about: string;
    price: number;
    faqs: FaqEntry[];
    reviews: Review[];
    rating: number;
    totalReviews: number;
  }
  
  interface FaqEntry {
    question: string;
    answer: string
  }
  
  interface Review {
    name: string;
    rating: number;
    comment: string;
  }
const Page = async ({ params }: { params: { slug: string } }) => {
  const supabase = createClient();
  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("service_id", params?.slug);
  return (
    <div>
      <div>
        <BookingComponent serviceObject={service?.[0]} />
      </div>
    </div>
  );
};

export default Page;

function BookingComponent({ serviceObject }:{serviceObject:Service}) {
  const service = transformedData(serviceObject);
  const totalserviceratingoverfive = 5 - Math.floor(service.rating);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b3339]">
              {service.name}
            </h1>
            <p className="mt-2 text-gray-500">{service?.description}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-[#0b3339]">
                Service Details
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Service</p>
                  <p className="font-medium">{service.service}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium text-paws-darkblue">
                    {CurrencyFormatter(service?.price)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{service.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">April 29, 2024 - May 1, 2024</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold text-[#0b3339]">
                Customer Reviews
              </h2>
              <div className="mt-4 space-y-4">
                {service.reviews?.map((review, index) => {
                  const totalratingoverfive = 5 - Math.floor(review.rating);
                  const name = review.name;
                  let initials = "";
                  for (const word of name.split(" ")) {
                    initials += word.charAt(0).toUpperCase();
                  }
                  return (
                    <div className="flex items-start gap-4" key={index}>
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage
                          alt="@username"
                          src="/placeholder-user.jpg"
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center gap-0.5 text-xs font-medium text-gray-500">
                            {Array.from({
                              length: Math.floor(review.rating),
                            }).map((_, index) => (
                              <StarIcon
                                className="w-4 h-4 fill-[#e5f973]"
                                key={index}
                              />
                            ))}
                            {Array.from({
                              length: Math.floor(totalratingoverfive),
                            }).map((_, index) => (
                              <StarIcon
                                className="w-4 h-4 fill-muted stroke-muted-foreground"
                                key={index}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-paws-darkblue rounded-lg p-6 md:p-8 lg:p-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-paws-gold">About Us</h2>
            <div>
              <p className="text-white">{service.about}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-100">Our Rating</h2>
            <div className="flex items-center gap-0.5 text-xs font-medium text-gray-500">
              {Array.from({
                length: Math.floor(service.rating),
              }).map((_, index) => (
                <StarIcon className="w-4 h-4 fill-[#e5f973]" key={index} />
              ))}
              {Array.from({
                length: Math.floor(totalserviceratingoverfive),
              }).map((_, index) => (
                <StarIcon
                  className="w-4 h-4 fill-muted stroke-muted-foreground"
                  key={index}
                />
              ))}
              <div className="text-lg text-gray-100">
                <p>Reviews({service.totalReviews})</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-100">
              Booking Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-100">Service</p>
                <p className="font-medium text-paws-gold">{service.service}</p>
              </div>
              <div>
                <p className="text-gray-100">Price</p>
                <p className="font-medium text-paws-gold">
                  {CurrencyFormatter(service.price)} Per Visit
                </p>
              </div>
              <div>
                <p className="text-gray-100">Location</p>
                <p className="font-medium text-paws-gold">{service.location}</p>
              </div>
              <div>
                <p className="text-gray-100">Date</p>
                <p className="font-medium text-paws-gold">
                  April 29, 2024 - May 1, 2024
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <BookingForm
            {...{ product_name: service.name, product_id: service.service_id }}
          />
        </div>
      </div>
    </main>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
