import PackageHero from "./PackageHero";
import PackageSearch from "./PackageSearch";
import PackageFilters from "./PackageFilters";
import PackageGrid from "./PackageGrid";
import PackageCTA from "./PackageCTA";

import { Package } from "@/types/package";
import type { Destination } from "@/lib/types/destination";
import type { Category } from "@/lib/types/category";
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
  return (
    <main className="min-h-screen bg-white">

      <PackageHero />

      <PackageSearch />

      <PackageFilters
        categories={categories}
        destinations={destinations}
      />

      <PackageGrid
        packages={packages}
      />

      <PackageCTA />

    </main>
  );
}