
import { ROUTES } from "@/config/routes"
import BreadCrumbsList from "@/components/shared/bread-crumbs-list"
import CheckOutForm from "@/components/checkout/check-out-form"



const CheckoutPage = () => {
    const breadcrumbs = [
        { name: 'Головна', href: ROUTES.home },
        { name: 'Оформити замовлення' },
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