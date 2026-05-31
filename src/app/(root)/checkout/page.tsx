import { getTranslations } from "next-intl/server"
import { ROUTES } from "@/config/routes"
import BreadCrumbsList from "@/components/shared/bread-crumbs-list"
import CheckOutForm from "@/components/checkout/check-out-form"

const CheckoutPage = async () => {
    const t = await getTranslations('checkout')
    const tCommon = await getTranslations('common')

    const breadcrumbs = [
        { name: tCommon('home'), href: ROUTES.home },
        { name: t('breadcrumb') },
    ]

    return (
        <div className="container mx-auto">
            <BreadCrumbsList list={breadcrumbs} />
            <div className="my-4">
                <CheckOutForm />
            </div>
        </div>
    )
}

export default CheckoutPage
