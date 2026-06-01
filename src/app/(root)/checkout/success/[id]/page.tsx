

const SuccessOrder = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
     return (
        <div data-testid="success-page" className="container mx-auto">
            <div className="my-4 text-center">
                <h2 data-testid="success-heading" className="text-3xl font-bold mb-4">Замовлення успішно створено. Номер замовлення: <span data-testid="success-order-id">{id}</span></h2>
               </div>
        </div>
    )
}

export default SuccessOrder