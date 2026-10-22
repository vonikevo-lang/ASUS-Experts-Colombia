import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "onDark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center justify-center h-11 px-6 rounded-btn font-sans text-[15px] font-medium uppercase tracking-[0.04em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-asus-blue disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-asus-blue text-white hover:bg-asus-blue-hover",
  secondary:
    "bg-transparent text-asus-blue border border-asus-blue hover:bg-asus-blue-soft",
  onDark:
    "bg-transparent text-white border border-white hover:bg-white/10",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    );
  },
);

Button.displayName = "Button";
