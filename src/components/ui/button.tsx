import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  'flex justify-center items-center shrink-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer outline-none',
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-primary-300 text-neutral-25 hover:bg-primary-300/90',
        outline:
          'border border-neutral-800 rounded-full hover:border-neutral-700',
        ghost: "hover:bg-neutral-25 hover:text-primary-300 dark:hover:bg-neutral-75/50",
        link: "text-primary-300 underline-offset-4 hover:underline",
      },
      size: {
        default: 'h-12 px-2',
        icon: 'size-10 md:size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
