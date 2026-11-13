import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-[#23252a] bg-[#08090a] px-3 py-2 text-xs leading-relaxed text-[#f7f8f8] transition-colors outline-none placeholder:text-[#62666d] focus:border-[#5e69d1] focus:ring-2 focus:ring-[#5e6ad2]/25 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
