import * as React from "react";

import { cn } from "@/utils/cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}