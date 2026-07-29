"use client";
import { useMemo, useState } from "react";
import PackageHero from "./PackageHero";
import PackageSearch from "./PackageSearch";
import PackageFilters from "./PackageFilters";
import PackageGrid from "./PackageGrid";
import PackageCTA from "./PackageCTA";

import { Package } from "@/types/package";
import type { Destination } from "@/lib/types/destination";
import type { Category } from "@/lib/types/category";
import { Footer } from "@/components/footer";
interface PackageListingProps {
  packages: Package[];
  categories: Category[];
  destinations: Destination[];
}

export default function PackageListing({
  packages,
  categories,
  destinations,
}: PackageListingProps) {

    const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [state, setState] = useState("all");
const [destination, setDestination] = useState("all");


const filteredPackages = useMemo(() => {
  let data = [...packages];

  if (search.trim()) {
    const query = search.toLowerCase();

    data = data.filter((pkg) =>
      pkg.name.toLowerCase().includes(query)
    );
  }

  return data;
}, [packages, search]);

console.log("Search:", search);
console.log("Filtered:", filteredPackages.length);



  return (
    <main className="min-h-screen bg-white">

      <PackageHero />

      <PackageSearch
  value={search}
  onSearch={setSearch}
/>

      <PackageFilters
        categories={categories}
        destinations={destinations}
      />

      <PackageGrid
  packages={filteredPackages}
/>

      <PackageCTA />
      <Footer/>

    </main>
  );
}