import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16", className)}>
      {children}
    </Component>
  )
}
