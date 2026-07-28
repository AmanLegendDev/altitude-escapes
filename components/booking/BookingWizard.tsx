"use client";



import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema } from "@/lib/validations/booking";


import { useState } from "react";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import type { BookingFormData } from "./types";


import { useRouter } from "next/navigation";
import { toast } from "sonner";








const steps = [
  "Personal",
  "Trip",
  "Review",
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] =
    useState(1);



    const router = useRouter();
 const methods = useForm<BookingFormData>({
  resolver: zodResolver(bookingSchema),

  mode: "onTouched",

  defaultValues: {
  package: "",
  customerName: "",
  phone: "",
  email: "",
  travelDate: "",
  adults: 2,

  childrenCount: 0,
  childrenAges: [],

  pickupLocation: "",
  specialRequest: "",
  totalPrice: 0,
}
});

const { trigger } = methods;




const onSubmit = async (
  data: BookingFormData
) => {
  try {
    const response = await fetch(
      "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      toast.error(
        result.message ||
          "Booking failed"
      );
      return;
    }

    toast.success(
      "Booking created successfully!"
    );

    router.push(
  `/booking/success?id=${result.bookingId}`
);
  } catch (error) {
    console.error(error);

    toast.error(
      "Something went wrong."
    );
  }
};


async function nextStep() {
  let fields: (keyof BookingFormData)[] = [];

  if (currentStep === 1) {
    fields = [
      "customerName",
      "phone",
      "email",
    ];
  }

  if (currentStep === 2) {
   fields = [
  "package",
  "travelDate",
  "adults",
  "childrenCount",
  "pickupLocation",
];
  }

  const isValid = await trigger(fields);

  if (!isValid) return;

  if (currentStep < 3) {
    setCurrentStep((prev) => prev + 1);
  }
}

  function previousStep() {
    if (currentStep > 1) {
      setCurrentStep(
        (prev) => prev - 1
      );
    }
  }

 return (
  <FormProvider {...methods}>

    
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20">

      {/* Background Decoration */}
<div className="mb-10 text-center">

  <span className="rounded-full bg-[#3BAEA0]/10 px-4 py-2 text-sm font-semibold text-[#3BAEA0]">
    Secure Booking Process
  </span>

  <h2 className="mt-5 text-4xl font-bold text-slate-900">
    Reserve Your Himalayan Adventure
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-slate-600">
    Complete your booking in just a few simple steps. Your information is protected with secure encryption.
  </p>

</div>
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#0F4C81]/5 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#3BAEA0]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">

        {/* Progress */}

        <div className="mb-20 flex justify-center">

          <div className="mx-auto flex w-fit items-center justify-center">

            {steps.map((step, index) => {

              const stepNumber = index + 1;

              const active = currentStep >= stepNumber;

              const completed = currentStep > stepNumber;

              return (

                

                <div
  key={step}
  className="flex items-center"
>
                    

                  <div className="flex flex-col items-center">

                    <div
                      className={`
                        relative
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        border
                        text-lg
                        font-bold
                        transition-all
                        duration-500

                        ${
                          active
                            ? "border-[#0F4C81] bg-gradient-to-br from-[#0F4C81] to-[#3BAEA0] text-white shadow-xl shadow-[#0F4C81]/30"
                            : "border-slate-300 bg-white text-slate-400"
                        }
                      `}
                    >

                      {completed ? "✓" : stepNumber}

                    </div>

                    <span
                      className={`
                        mt-4
                        text-sm
                        font-semibold

                        ${
                          active
                            ? "text-[#0F4C81]"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {step}
                    </span>

                  </div>

                  {stepNumber !== steps.length && (

                    <div className="mx-5 h-[5px] flex-1 rounded-full bg-slate-200">

                      <div
                        className={`
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-[#0F4C81]
                          to-[#3BAEA0]
                          transition-all
                          duration-500

                          ${
                            completed
                              ? "w-full"
                              : "w-0"
                          }
                        `}
                      />

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        </div>

        {/* Booking Card */}

        <div
          className="
            rounded-[36px]
            border
            border-white/70
            bg-white/90
            p-12
            shadow-[0_30px_70px_rgba(15,76,129,0.12)]
            backdrop-blur-xl
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >

              {currentStep === 1 && <StepOne />}

              {currentStep === 2 && <StepTwo />}

              {currentStep === 3 && <StepThree />}

            </motion.div>

          </AnimatePresence>

          {/* Buttons */}

          <div className="mt-16 flex items-center justify-between">
                        <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-300
                bg-white
                px-8
                py-3.5
                font-semibold
                text-slate-700
                transition-all
                duration-300
                hover:border-[#0F4C81]
                hover:text-[#0F4C81]
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              ← Back
            </button>

            {currentStep < 3 ? (

              <button
                type="button"
                onClick={nextStep}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-[#0F4C81]
                  to-[#3BAEA0]
                  px-9
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:shadow-xl
                  active:scale-[0.98]
                "
              >
                Next
                <span className="text-lg">→</span>
              </button>

            ) : (

              <button
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-[#3BAEA0]
                  px-10
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:shadow-xl
                  active:scale-[0.98]
                "
              >
                Confirm Booking
                <span>✓</span>
              </button>

            )}

          </div>

        </div>

      </div>

    </section>

  </FormProvider>
);
}