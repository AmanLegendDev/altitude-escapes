"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "./types";
import { useState ,useEffect } from "react";

export default function StepTwo() {



interface Package {
  _id: string;
  name: string;

  originalPrice: number;
  discountedPrice: number;

  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
}

const [packages, setPackages] = useState<Package[]>([]);

const {
  register,
  watch,
  setValue,
  formState: { errors },
} = useFormContext<BookingFormData>();

const childrenCount = watch("childrenCount");
const childrenAges = watch("childrenAges");


const selectedPackageId = watch("package");
const adults = watch("adults");


const selectedPackage = packages.find(
  (p) => p._id === selectedPackageId
);




let adultTotal = 0;
let childTotal = 0;

if (selectedPackage) {
  const adultPrice = selectedPackage.discountedPrice;

  adultTotal = (adults || 0) * adultPrice;

  (childrenAges || []).forEach((age) => {
    const policy = selectedPackage.childPolicy;

    if (age < policy.complimentaryBelow) {
      return;
    }

    if (age < policy.halfPriceBelow) {
      childTotal +=
        adultPrice *
        (policy.halfPricePercentage / 100);
    } else {
      childTotal += adultPrice;
    }
  });
}

const total = adultTotal + childTotal;


useEffect(() => {
  setValue("totalPrice", total, {
    shouldDirty: true,
  });
}, [total, setValue]);


useEffect(() => {
  if (!childrenCount) {
    setValue("childrenAges", []);
    return;
  }

  const updated = (childrenAges || []).slice(0, childrenCount);

  while (updated.length < childrenCount) {
    updated.push(0);
  }

  setValue("childrenAges", updated);
}, [childrenCount, childrenAges, setValue]);

useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");

      const data = await res.json();

      setPackages(data.packages);
    } catch (err) {
      console.error(err);
    }
  };

  fetchPackages();
}, []);

  return (

    <div>

      <h2 className="text-3xl font-bold">

        Trip Details

      </h2>

      <p className="mt-3 text-slate-600">

        Complete your travel information.

      </p>

      <div>

  <label className="mb-2 block">
    Package
  </label>

  <select
  {...register("package")}
  className="w-full rounded-xl border border-slate-300 px-4 py-3"
>
  <option value="">
    Select Package
  </option>

  {packages.map((pkg) => (
    <option
      key={pkg._id}
      value={pkg._id}
    >
      {pkg.name}
    </option>
  ))}
</select>

  {errors.package && (
    <p className="mt-2 text-sm text-red-500">
      {errors.package.message}
    </p>
  )}

</div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block">

            Travel Date

          </label>

          <input

            type="date"

   {...register("travelDate")}

            className="w-full rounded-xl border border-slate-300 px-4 py-3"

          />

          {errors.travelDate && (
  <p className="mt-2 text-sm text-red-500">
    {errors.travelDate.message}
  </p>
)}

        </div>

        <div>

          <label className="mb-2 block">

            Adults

          </label>

          <input

            type="number"

    {...register("adults", {
  valueAsNumber: true,
})}

            className="w-full rounded-xl border border-slate-300 px-4 py-3"

          />

          {errors.adults && (
  <p className="mt-2 text-sm text-red-500">
    {errors.adults.message}
  </p>
)}

        </div>

        <div>

  <label className="mb-2 block">
    Children
  </label>

  <input
    type="number"
    min={0}
    {...register("childrenCount", {
      valueAsNumber: true,
    })}
    className="w-full rounded-xl border border-slate-300 px-4 py-3"
  />

  {errors.childrenCount && (
    <p className="mt-2 text-sm text-red-500">
      {errors.childrenCount.message}
    </p>
  )}

</div>

        <div>

            {Array.from({ length: childrenCount || 0 }).map((_, index) => (
  <div key={index} className="mt-4">

    <label className="mb-2 block">
      Child {index + 1} Age
    </label>

    <input
      type="number"
      min={0}
      max={17}
      value={childrenAges?.[index] ?? ""}
     onChange={(e) => {
  const updated = [...(childrenAges || [])];

  updated[index] = Number(e.target.value);

  setValue("childrenAges", updated, {
    shouldValidate: true,
    shouldDirty: true,
  });
}}
      className="w-full rounded-xl border border-slate-300 px-4 py-3"
    />

  </div>
))}

          <label className="mb-2 block">

            Pickup Location

          </label>

          <input

   {...register("pickupLocation")}

            className="w-full rounded-xl border border-slate-300 px-4 py-3"

          />
          


          {errors.pickupLocation && (
  <p className="mt-2 text-sm text-red-500">
    {errors.pickupLocation.message}
  </p>
)}

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block">

            Special Request

          </label>

          <textarea

            rows={5}

            {...register("specialRequest")}

            className="w-full rounded-xl border border-slate-300 px-4 py-3"

          />


          <div className="mt-10 rounded-2xl border bg-slate-50 p-6">

  <h3 className="text-lg font-semibold">
    Price Summary
  </h3>

  <div className="mt-4 space-y-2">

    <div className="flex justify-between">
      <span>Adults</span>
      <span>₹{adultTotal}</span>
    </div>

    <div className="flex justify-between">
      <span>Children</span>
      <span>₹{childTotal}</span>
    </div>

    <hr />

    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>
      <span>₹{total}</span>
    </div>

  </div>

</div>

        </div>

      </div>

    </div>

  );
}