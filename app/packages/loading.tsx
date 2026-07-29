import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <main>

      {/* Hero Skeleton */}

      <section className="relative overflow-hidden bg-slate-900 py-28">

        <div className="container mx-auto px-6">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto h-5 w-40 animate-pulse rounded-full bg-white/20" />

            <div className="mx-auto mt-6 h-14 w-3/4 animate-pulse rounded-lg bg-white/20" />

            <div className="mx-auto mt-5 h-5 w-full animate-pulse rounded bg-white/10" />

            <div className="mx-auto mt-3 h-5 w-5/6 animate-pulse rounded bg-white/10" />

            <div className="mx-auto mt-10 h-14 w-56 animate-pulse rounded-xl bg-white/20" />

          </div>

        </div>

      </section>

      {/* Filters */}

      <section className="border-b border-slate-200 py-10">

        <div className="container mx-auto px-6">

          <div className="grid gap-4 lg:grid-cols-5">

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-xl bg-slate-200"
              />
            ))}

          </div>

        </div>

      </section>

      {/* Cards */}

      <section className="py-16">

        <div className="container mx-auto px-6">

          <div className="mb-10">

            <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 h-10 w-72 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 h-5 w-96 animate-pulse rounded bg-slate-200" />

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg"
              >
                <div className="h-72 animate-pulse bg-slate-200" />

                <CardContent className="space-y-5 p-6">

                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                  <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="space-y-2">

                    <div className="h-4 animate-pulse rounded bg-slate-200" />

                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />

                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />

                  </div>

                  <div className="flex gap-3">

                    <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />

                    <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />

                    <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />

                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">

                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

                    <div className="mt-4 h-9 w-40 animate-pulse rounded bg-slate-200" />

                  </div>

                  <div className="flex gap-3">

                    <div className="h-12 flex-1 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-12 flex-1 animate-pulse rounded-xl bg-slate-200" />

                  </div>

                </CardContent>

              </Card>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}