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

    <form
  onSubmit={methods.handleSubmit(
    onSubmit
  )}
>
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* Progress */}

        <div className="mb-16 flex items-center justify-between">

          {steps.map(
            (step, index) => {
              const stepNumber =
                index + 1;

              const active =
                currentStep >=
                stepNumber;

              return (
                <div
                  key={step}
                  className="flex flex-1 items-center"
                >
                  <div className="flex flex-col items-center">

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        text-lg
                        font-bold
                        transition-all
                        duration-300

                        ${
                          active
                            ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                            : "border-slate-300 bg-white text-slate-400"
                        }
                      `}
                    >
                      {stepNumber}
                    </div>

                    <p
                      className={`
                        mt-3
                        text-sm
                        font-medium

                        ${
                          active
                            ? "text-[#0F4C81]"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {step}
                    </p>
                  </div>

                  {stepNumber <
                    steps.length && (
                    <div
                      className="
                        mx-4
                        h-[3px]
                        flex-1
                        rounded-full
                        bg-slate-200
                      "
                    >
                      <div
                        className={`
                          h-full
                          rounded-full
                          bg-[#0F4C81]
                          transition-all
                          duration-500

                          ${
                            currentStep >
                            stepNumber
                              ? "w-full"
                              : "w-0"
                          }
                        `}
                      />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Card */}

        <div
          className="
            rounded-[30px]
            bg-white
            p-10
            shadow-xl
          "
        >
          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -40,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              {currentStep ===
                1 && <StepOne />}

              {currentStep ===
                2 && <StepTwo />}

              {currentStep ===
                3 && (
                <StepThree />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}

          <div className="mt-14 flex justify-between">

            <button
              type="button"
              onClick={
                previousStep
              }
              disabled={
                currentStep ===
                1
              }
              className="
                rounded-full
                border
                border-slate-300
                px-7
                py-3
                font-semibold
                transition-all

                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              ← Back
            </button>

            {currentStep <
            3 ? (
              <button
                type="button"
                onClick={
                  nextStep
                }
                className="
                  rounded-full
                  bg-[#0F4C81]
                  px-8
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[#0B3A63]
                "
              >
                Next →
              </button>
            ) : (
              <button
  type="submit"
                className="
                  rounded-full
                  bg-[#3BAEA0]
                  px-8
                  py-3
                  font-semibold
                  text-white
                "
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </section>

     </form>

  </FormProvider>
  );
}