"use client";

import { useFormContext } from "react-hook-form";

import type { BookingFormData } from "./types";

export default function StepOne() {

const {
  register,
  formState: { errors },
} = useFormContext<BookingFormData>();

  return (

    <div>

      <h2 className="text-3xl font-bold text-[#081C2D]">

        Personal Details

      </h2>

      <p className="mt-3 text-slate-600">

        Tell us who is travelling.

      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">

            Full Name

          </label>

       <input
 {...register("customerName")}
  className="w-full rounded-xl border border-slate-300 px-4 py-3"
/>

{errors.customerName && (
  <p className="mt-2 text-sm text-red-500">
    {errors.customerName.message}
  </p>
)}

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Phone

          </label>

     <input
 {...register("phone")}
  className="w-full rounded-xl border border-slate-300 px-4 py-3"
/>

{errors.phone && (
  <p className="mt-2 text-sm text-red-500">
    {errors.phone.message}
  </p>
)}

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium">

            Email

          </label>

      <input
  type="email"
{...register("email")}
  className="w-full rounded-xl border border-slate-300 px-4 py-3"
/>

{errors.email && (
  <p className="mt-2 text-sm text-red-500">
    {errors.email.message}
  </p>
)}

        </div>

      </div>

    </div>

  );
}