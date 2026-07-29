"use client";

import { useMemo, useState } from "react";
import type { Destination } from "@/lib/types/destination";

  import { filterDestinations } from "@/lib/utils/destination-filter";

import DestinationSearch from "@/components/destinations/listing/DestinationSearch";
import DestinationFilters from "@/components/destinations/listing/DestinationFilters";

import DestinationGrid from "@/components/destinations/listing/DestinationGrid";
import DestinationCTA from "@/components/destinations/listing/DestinationCTA";




interface DestinationListingProps {
  destinations: Destination[];
  initialSearch: string;
  initialState: string;
  initialFeatured: string;
  initialSort: string;
}

export default function DestinationListing({
  destinations,
  initialSearch,
  initialState,
  initialFeatured,
  initialSort,
  
}: DestinationListingProps) {
  const [search, setSearch] = useState(initialSearch);

  const [state, setState] = useState(initialState);

  const [featured, setFeatured] = useState(initialFeatured);

  const [sort, setSort] = useState(initialSort);



const filteredDestinations = useMemo(() => {
  return filterDestinations(destinations, {
    search,
    state,
    featured,
    sort,
  });
}, [
  destinations,
  search,
  state,
  featured,
  sort,
]);

console.log("Search:", search);
console.log("Results:", filteredDestinations.length);

const states = useMemo(() => {
  return [...new Set(destinations.map((d) => d.state.trim()))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}, [destinations]);
  return (
    <>
      <section className="mt-14 space-y-8">

        <DestinationSearch
          search={search}
          setSearch={setSearch}
        />

       <DestinationFilters
  featured={featured}
  setFeatured={setFeatured}
  state={state}
  setState={setState}
  sort={sort}
  setSort={setSort}
  states={states}
/>

        <DestinationGrid
          destinations={filteredDestinations}
        />

      </section>

      <DestinationCTA />
    </>
  );
}