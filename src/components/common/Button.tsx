import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "rounded-full px-8 py-4 font-semibold transition duration-300",
        variant === "primary"
          ? "bg-[#C8A97E] text-white hover:bg-[#b08f65]"
          : "border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}