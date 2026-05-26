import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import CatalogList from "@/config/catalog-list";
import { NavigationConfigList } from "@/config/navigation-list";
import CurrentLocation from "@/components/locations/current-location";
import SocialLinks from "@/config/social-links";

interface MobileMenuDrawerProps {
  open?: boolean
  onClose?: () => void
}

const MobileMenuDrawer = ({ open, onClose }: MobileMenuDrawerProps) => {
    return (
        <Drawer

            direction="top"
            open={open}
            onClose={onClose}
            >

        <DrawerContent
            className="header-menu-drawer !rounded-none !h-[calc(100vh-var(--header-height))] !max-h-[calc(100vh-var(--header-height))] !mb-0 !top-[var(--header-height)]"

        >
            <DrawerHeader className="p-0">
                <VisuallyHidden>
                    <DrawerTitle>Мобільне меню</DrawerTitle>
                </VisuallyHidden>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-7 py-4">
                {/* catalog */}
                <div className="mb-5">
                    <h4 className="font-bold text-[18px] mb-2">
                        <span className="font-bold">Каталог</span>
                    </h4>
                    <ul className="flex flex-col gap-2">
                        {CatalogList.map((item, index) => (
                            <li key={index} className="mb-0 leading-normal text-[14px] style-lyra:mb-2 style-lyra:leading-relaxed">
                                <Link href="#" className="font-regular">{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* main menu */}
                <div className="mb-7">
                        <h4 className="font-bold text-[18px] mb-2">
                            Інформація
                        </h4>
                        <ul className="flex  gap-4">
                            {NavigationConfigList.map((item, index) => (
                                <li key={index} className="mb-0 leading-normal text-[14px] style-lyra:mb-2 style-lyra:leading-relaxed">
                                    <Link href={item.href} className="font-regular">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                </div>
                {/* location */}
                <div>
                    <h4 className="font-bold text-[18px] mb-2">
                        <span className="font-bold">Місто</span>
                    </h4>
                </div>
                <div className="flex justify-between items-center">
                    <h6>
                        Виберіть місто
                    </h6>
                    <CurrentLocation
                        className="px-3 rounded-[5px] border border-primary text-[14px] font-normal leading-none cursor-pointer"
                        buttonVariant="outline"
                    />
                </div>
            </div>
            <DrawerFooter>
                    {/* social */}
            <div className="mb-7 flex gap-6 items-center">
                <h4 className="font-bold text-[18px] mb-0">
                    Ми в:
                </h4>
                <ul className="flex  gap-4">
                    {SocialLinks.map((item, index) => (
                        <li key={index} className="mb-0 leading-normal text-[14px] style-lyra:mb-2 style-lyra:leading-relaxed hover:scale-125 transition-all">
                            <a href={item.href} target="_blank" rel="noreferrer" className="font-regular">
                                <img src={item.icon} alt={item.name} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}

export default MobileMenuDrawer