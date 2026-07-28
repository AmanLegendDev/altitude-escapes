"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "./types";

interface Package {
  _id: string;
  name: string;
}

export default function StepThree() {
  const { watch } =
    useFormContext<BookingFormData>();

  const values = watch();

  const [packages, setPackages] = useState<
    Package[]
  >([]);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();

        setPackages(data.packages);
      } catch (err) {
        console.error(err);
      }
    }

    loadPackages();
  }, []);

  const selectedPackage = packages.find(
    (p) => p._id === values.package
  );


  useEffect(() => {
  console.log("STEP THREE MOUNTED");
}, []);

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Review Your Booking
        </h2>

        <p className="mt-2 text-slate-600">
          Please verify all information before
          confirming your booking.
        </p>
      </div>

      {/* Traveller */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h3 className="mb-6 border-b pb-3 text-xl font-semibold">
          Traveller Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <Info
            label="Full Name"
            value={values.customerName}
          />

          <Info
            label="Phone"
            value={values.phone}
          />

          <Info
            label="Email"
            value={values.email}
          />

        </div>

      </div>

      {/* Trip */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h3 className="mb-6 border-b pb-3 text-xl font-semibold">
          Trip Details
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <Info
            label="Package"
            value={
              selectedPackage?.name ??
              "-"
            }
          />

          <Info
            label="Travel Date"
            value={values.travelDate}
          />

          <Info
            label="Adults"
            value={String(values.adults)}
          />

          <Info
            label="Children"
            value={String(values.childrenCount)}
          />

          <Info
            label="Pickup"
            value={values.pickupLocation}
          />

        </div>

      </div>

      {/* Children */}

      {(values.childrenCount ?? 0) > 0 && (
        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h3 className="mb-5 border-b pb-3 text-xl font-semibold">
            Children Ages
          </h3>

          <div className="flex flex-wrap gap-3">

            {values.childrenAges?.map(
              (age, index) => (
                <div
                  key={index}
                  className="rounded-full bg-slate-100 px-5 py-2 font-medium"
                >
                  Child {index + 1} • {age} Years
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* Request */}

      {values.specialRequest && (
        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <h3 className="mb-5 border-b pb-3 text-xl font-semibold">
            Special Request
          </h3>

          <p className="leading-7 text-slate-700">
            {values.specialRequest}
          </p>

        </div>
      )}

      {/* Price */}

      <div className="rounded-3xl bg-[#0F4C81] p-8 text-white">

        <h3 className="text-2xl font-semibold">
          Booking Summary
        </h3>

        <div className="mt-8 space-y-4">

          <Row
            title="Booking Status"
            value="Pending"
          />

          <Row
            title="Payment Status"
            value="Pending"
          />

          <hr className="border-white/20" />

          <div className="flex items-center justify-between">

            <span className="text-xl font-semibold">
              Total Amount
            </span>

            <span className="text-4xl font-bold">
              ₹
              {values.totalPrice.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      {/* Trust */}

      <div className="rounded-3xl border bg-emerald-50 p-6">

        <div className="grid gap-4 md:grid-cols-3">

          <Trust text="Secure Booking" />

          <Trust text="Instant Confirmation" />

          <Trust text="24×7 Travel Support" />

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || "-"}
      </p>

    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">

      <span>{title}</span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

function Trust({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
        ✓
      </div>

      <span className="font-medium text-slate-800">
        {text}
      </span>

    </div>
  );
}