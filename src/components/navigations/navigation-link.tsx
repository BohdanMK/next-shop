import { cn } from "@/lib/utils"
import Link from "next/link";

interface INavProps {
    href: string;
    isActive?: boolean;
    children: React.ReactNode;
}

const NavigationLink = ({ href, isActive, children }: INavProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "hover:text-gray-300 transition-colors duration-200",
                isActive && "text-white font-medium"
            )}
        >
            {children}
        </Link>
    )
}

export default NavigationLink;
