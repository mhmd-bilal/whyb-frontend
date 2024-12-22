import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full border-input bg-background px-0 py-2 text-base ring-offset-background placeholder:text-muted-foreground border-0 border-b-2 border-dotted focus-visible:outline-none focus-visible:none focus-visible:none focus-visible:none focus:border-primary disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
