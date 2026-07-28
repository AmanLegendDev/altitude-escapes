"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();

  const bookingId =
    searchParams.get("id");

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-3xl px-6">

        <div className="rounded-[32px] bg-white p-10 shadow-xl">

          {/* Success */}

          <div className="flex flex-col items-center text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">

              <CheckCircle2
                size={60}
                className="text-emerald-600"
              />

            </div>

            <h1 className="mt-8 text-4xl font-bold text-slate-900">

              Booking Confirmed 🎉

            </h1>

            <p className="mt-4 max-w-xl text-lg text-slate-600">

              Thank you for choosing
              <span className="font-semibold">
                {" "}
                Altitude Escapes
              </span>
              .

              <br />

              Your booking request has been received successfully.

            </p>

          </div>

          {/* Booking */}

          <div className="mt-10 rounded-2xl border bg-slate-50 p-8">

            <h2 className="text-lg font-semibold">

              Booking Information

            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Booking ID

                </span>

                <span className="font-bold">

                  {bookingId}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Booking Status

                </span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                  Pending

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Payment

                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">

                  Pending

                </span>

              </div>

            </div>

          </div>

          {/* Next Steps */}

          <div className="mt-10 rounded-2xl bg-[#0F4C81] p-8 text-white">

            <h3 className="text-xl font-semibold">

              What Happens Next?

            </h3>

            <ul className="mt-5 space-y-4 text-white/90">

              <li>
                ✓ Our travel expert will verify your booking.
              </li>

              <li>
                ✓ You will receive a confirmation call shortly.
              </li>

              <li>
                ✓ Hotel and itinerary details will be shared via Email & WhatsApp.
              </li>

              <li>
                ✓ Secure your booking by completing the payment when requested.
              </li>

            </ul>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 md:flex-row">

            <Link
              href="/"
              className="flex-1 rounded-full bg-[#0F4C81] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#0B3A63]"
            >

              Back To Home

            </Link>

            <button
              className="flex-1 rounded-full border border-slate-300 px-6 py-4 font-semibold transition hover:bg-slate-100"
            >

              Download Confirmation

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}