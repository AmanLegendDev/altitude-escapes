"use client";

import { useMemo, useState } from "react";

  import { filterDestinations } from "@/lib/utils/destination-filter";

import DestinationSearch from "@/components/destinations/listing/DestinationSearch";
import DestinationFilters from "@/components/destinations/listing/DestinationFilters";

import DestinationGrid from "@/components/destinations/listing/DestinationGrid";
import DestinationCTA from "@/components/destinations/listing/DestinationCTA";


interface Destination {
  _id: string;
  slug: string;
  name: string;
  heroImage: string;
  shortDescription: string;
  description: string;
  country: string;
  state: string;
  city: string;
  bestTime: string;
  altitude: string;
  duration: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  featuredOrder: number;
  startingPrice: number;
}

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
        />

        <DestinationGrid
          destinations={filteredDestinations}
        />

      </section>

      <DestinationCTA />
    </>
  );
}