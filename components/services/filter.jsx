"use client";

import { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "react-use";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function ServiceFilterComponent({}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const params = new URLSearchParams(searchParams.toString());

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
    router.push(pathname + "?" + createQueryString("name", e.target.value));
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    router.push(pathname + "?" + createQueryString("location", e.target.value));
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    router.push(pathname + "?" + createQueryString("rating", e.target.value));
  };

  return (
    <div>
      <h2 className="text-xl font-medium">Filter:</h2>
      <div className="flex justify-center">
        <div className="w-full py-4 flex mt-4 max-w-6xl gap-x-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Search by location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="number"
              placeholder="Search by rating"
              value={rating}
              onChange={handleRatingChange}
              min={0}
              max={5}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
