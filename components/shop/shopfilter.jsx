"use client";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function ProductFilterComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    router.push(pathname + "?" + createQueryString("search", e.target.value));
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    router.push(pathname + "?" + createQueryString("minPrice", e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    router.push(pathname + "?" + createQueryString("maxPrice", e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    router.push(pathname + "?" + createQueryString("category", e.target.value));
  };

  return (
    <div>
      <h2 className="text-xl font-medium">Filter Products:</h2>
      <div className="flex justify-center">
        <div className="w-full py-4 flex mt-4 max-w-6xl gap-x-4">
          <div className="grid gap-1.5">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search products"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Minimum price"
              value={minPrice}
              onChange={handleMinPriceChange}
              min={0}
              step={0.01}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Maximum price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              min={0}
              step={0.01}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="Search by category"
              value={category}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
