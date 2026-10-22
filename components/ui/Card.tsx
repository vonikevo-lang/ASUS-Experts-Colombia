import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-border rounded-card shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-elev",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
