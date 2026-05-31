

const SuccessOrder = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
     return (
        <div className="container mx-auto">
            <div className="my-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Замовлення успішно створено. Номер замовлення: {id}</h2>
               </div>
        </div>
    )
}

export default SuccessOrder