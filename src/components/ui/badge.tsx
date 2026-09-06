import * as React from "react";

import { cn } from "@/lib/utils";

export const badgeTones = {
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  violet: "bg-violet-100 text-violet-800 border-violet-200",
  cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
  indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
  green: "bg-green-100 text-green-800 border-green-200",
  red: "bg-red-100 text-red-800 border-red-200",
  stone: "bg-stone-100 text-stone-700 border-stone-200",
} as const;

export type BadgeTone = keyof typeof badgeTones;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

function Badge({ className, tone = "stone", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        badgeTones[tone],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
