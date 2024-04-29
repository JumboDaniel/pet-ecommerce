import Link from "next/link";
import { MapPin, Star } from "lucide-react";

////
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ServiceFilterComponent } from "@/components/services/filter";
import { createClient } from "@/utils/supabase/server";
import { EmptyService } from "@/components/emptystate/emptyservices";


export default async function ServicesPage({ params, searchParams }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
  const supabase = createClient();
  const name = searchParams?.name || "";
  const location = searchParams?.location || "";
//   const { data: services, error } = await supabase.from("services")
  let query = supabase.from('services').select('*');

  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }
  const { data: services, error } = await query;
  if (!services || services.length <= 0) {
    return (
      <div className="min-h-[500px] py-24">
        <EmptyService/>
      </div>
    );
  }
  return (
    <div>
      <ServiceFilterComponent />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl">
          {services?.map((service, index) => {
            return <ServiceCard {...{ service }} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
// {Object.keys(service).some((key) => key.startsWith("images/")) && (
//     <div>
//       {Object.keys(service)
//         .filter((key) => key.startsWith("images/"))
//         .map((imageUrlKey) => {
//             console.log('helloooooooooooo',imageUrlKey[0])
//           return <img src={service[imageUrlKey]} alt={service.name} />;
//         })}
//     </div>
//   )}
//@ts-expect-error
function ServiceCard({ service }) {
  const rating = Math.floor(service.rating);
  return (
    <Card className="w-full bg-[#0b3339] text-gray-50">
      {Object.keys(service).some((key) => key.startsWith("images/")) && (
        <div>
          <img
            src={
              // Access the first element of the filtered image URL array
              Object.keys(service).filter((key) => key.startsWith("images/"))[0]
                ? service[
                    Object.keys(service).filter((key) =>
                      key.startsWith("images/")
                    )[0]
                  ]
                : "fallback-image.jpg" // Optional fallback image if no images exist
            }
            height={300}
            className="h-[300px] object-cover w-full"
            alt={service.name}
          />
        </div>
      )}

      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-[#e5f973]">{service.name}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: rating }).map((_, index) => {
                return <Star fill="#fc8507" color="transparent" />;
              })}
            </div>
            <span className="text-sm text-gray-400">
              {service.totalReviews}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
          <CardDescription className="text-gray-400">
            {service.description}
          </CardDescription>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-[#e5f973] px-4 py-2 text-sm font-medium text-[#0b3339] shadow transition-colors hover:bg-[#e5f973]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0b3339] disabled:pointer-events-none disabled:opacity-50"
          href={`/services/${service.service_id}`}
        >
          View More
        </Link>
      </CardContent>
    </Card>
  );
}
