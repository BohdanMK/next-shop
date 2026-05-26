import { NavigationConfigList } from "@/config/navigation-list";
import NavigationLink from "@/components/navigations/navigation-link";
import { cn } from "@/lib/utils"

interface NavigationListProps {
    className?: string
}

const NavigationList = ({ className }: NavigationListProps) => {
    return (
        <ul className={cn("flex gap-4", className)}>
                { NavigationConfigList.map((item, index) => (
                    <li key={index} className="font-normal">
                        <NavigationLink
                            href={item.href}
                        >
                            {item.name}
                        </NavigationLink>
                    </li>
                ))}
        </ul>
 );
}

export default NavigationList;
