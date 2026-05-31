import { cn } from "@/lib/utils"

interface InputGroupProps {
  label?: string
  className?: string
  children: React.ReactNode
}

const InputGroup = ({ label, className, children }: InputGroupProps) => {
  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <label className="absolute -top-3 left-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-[var(--main-text-color)] z-10">
        {label}
      </label>
      {children}
    </div>
  )
}

export default InputGroup
