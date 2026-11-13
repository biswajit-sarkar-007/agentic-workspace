import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-[#23252a] bg-[#08090a] px-3 py-1.5 text-xs text-[#f7f8f8] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-[#f7f8f8] placeholder:text-[#62666d] focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e6ad2]/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
