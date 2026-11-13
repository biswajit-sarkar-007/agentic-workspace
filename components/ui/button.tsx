import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:border-[#5e69d1] focus-visible:ring-2 focus-visible:ring-[#5e6ad2]/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#5e6ad2] text-white hover:bg-[#828fff] active:bg-[#5e69d1] shadow-sm",
        outline:
          "border-[#23252a] bg-[#08090a] text-[#f7f8f8] hover:bg-[#121316] hover:border-[#31353d]",
        secondary:
          "border border-[#23252a] bg-[#121316] text-[#f7f8f8] hover:bg-[#1b1c20] hover:border-[#31353d]",
        ghost:
          "text-[#8a8f98] hover:bg-[#121316] hover:text-[#f7f8f8]",
        destructive:
          "bg-[#eb5757]/15 text-[#eb5757] border border-[#eb5757]/30 hover:bg-[#eb5757]/25",
        link: "text-[#5e6ad2] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-1.5 px-3.5 text-xs",
        xs: "h-6 gap-1 px-2 text-[11px]",
        sm: "h-7 gap-1.5 px-2.5 text-xs",
        lg: "h-10 gap-2 px-4 text-sm",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
