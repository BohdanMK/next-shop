import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ICloseBtnProps {
    onClose: () => void,
    className?: string
}

const CloseBtn = ({ onClose, className }: ICloseBtnProps) => {
  return (
    <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className={cn(
            "absolute top-3 end-3 size-8 bg-card hover:bg-card/80 border-y-0 border-x border-x-primary rounded-[5px]",
            className
        )}
    >
        <X className="size-5" />
    </Button>
  )

}

export default CloseBtn