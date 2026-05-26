'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import MobileMenuDrawer from "@/components/mobile/mobile-menu-drawer"

interface MobileMenuProps {
    isOpen: boolean
    onToggle: (value: boolean) => void
}

const MobileMenu = ({ isOpen, onToggle }: MobileMenuProps) => {
    return (
        <div>
            <Button
                variant="text"
                className={cn(
                    "burger-btn flex flex-col justify-center items-center w-8 h-8 gap-1.5 border-y-0 border-x border-x-[#ff0000] rounded-[5px]",
                    isOpen && "open-burger-btn"
                )}
                onClick={() => onToggle(!isOpen)}
            >
                <span className="block w-6 h-0.5 bg-current rounded"></span>
                <span className="block w-6 h-0.5 bg-current rounded"></span>
                <span className="block w-6 h-0.5 bg-current rounded"></span>
            </Button>
            <MobileMenuDrawer
                open={isOpen}
                onClose={() => onToggle(false)}
            />
        </div>
    )
}

export default MobileMenu