"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronRight,
  Home,
  ArrowLeft,
  MapPin,
} from "lucide-react";

interface PackageBreadcrumbProps {
  packageName: string;
  destinationName: string;
  destinationSlug: string;
}

export default function PackageBreadcrumb({
  packageName,
  destinationName,
  destinationSlug,
}: PackageBreadcrumbProps) {
  const router = useRouter();

  return (
    <section className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto px-6 py-5">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Back Button */}

          <button
            onClick={() => router.back()}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />

            Back
          </button>

          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="overflow-x-auto"
          >
            <ol className="flex min-w-max items-center gap-2 text-sm">

              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-slate-500 transition hover:text-emerald-600"
                >
                  <Home className="h-4 w-4" />

                  Home
                </Link>
              </li>

              <ChevronRight className="h-4 w-4 text-slate-400" />

              <li>
                <Link
                  href="/packages"
                  className="rounded-lg px-2 py-1 text-slate-500 transition hover:text-emerald-600"
                >
                  Packages
                </Link>
              </li>

              <ChevronRight className="h-4 w-4 text-slate-400" />

              <li>
                <Link
                  href={`/destinations/${destinationSlug}`}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-slate-500 transition hover:text-emerald-600"
                >
                  <MapPin className="h-4 w-4" />

                  {destinationName}
                </Link>
              </li>

              <ChevronRight className="h-4 w-4 text-slate-400" />

              <li
                className="max-w-[220px] truncate rounded-lg bg-emerald-50 px-3 py-1 font-semibold text-emerald-700"
                title={packageName}
              >
                {packageName}
              </li>

            </ol>
          </nav>

        </div>

      </div>
    </section>
  );
}