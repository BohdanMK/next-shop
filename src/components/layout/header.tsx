'use client'
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useHeaderHeight } from "@/hooks/use-header-height"
import NavigationList from "@/components/navigations/navigations-list";
import Logo from "@/components/brand/logo";
import CurrentLocation from "@/components/locations/current-location";
import HeaderContacts from "@/components/contacts/header-contacts";
import CartButton from "@/components/cart/header-button";
import MobileMenu from "@/components/mobile/mobile-menu";
import { useCart } from "@/hooks/queries/use-cart"

const Header = () => {
    const headerRef = useHeaderHeight()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { data: cart } = useCart()

    const totalItemsInCart = cart?.items?.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <header ref={headerRef} className={cn("text-white p-4 relative", isMenuOpen && "z-[60] pointer-events-auto")}>
            <div className="container mx-auto">
                <div className="flex justify-between lg:grid lg:grid-cols-3 items-center">
                    <NavigationList className="hidden lg:flex" />
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <div className="flex justify-end">
                        <div className="hidden lg:block">
                            <CurrentLocation/>
                        </div>
                        <HeaderContacts/>
                        <CartButton
                            className="hidden lg:block"
                            count={totalItemsInCart ? totalItemsInCart : 0}
                        />
                    </div>
                    <div className="block lg:hidden">
                        <MobileMenu isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;