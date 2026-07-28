import { ShieldCheck } from "lucide-react";

export default function BookingHero() {
  return (
    <section className="bg-[#081C2D] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">

          <div className="flex items-center gap-3 text-[#3BAEA0]">

            <ShieldCheck />

            Secure Booking

          </div>

          <h1 className="mt-6 text-5xl font-bold">

            Complete Your Booking

          </h1>

          <p className="mt-5 text-lg text-slate-300">

            Just a few quick steps and your Himalayan
            adventure will be reserved.

          </p>

        </div>

      </div>
    </section>
  );
}