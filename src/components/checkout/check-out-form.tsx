'use client'
import { useState, useEffect, useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { IMaskInput } from "react-imask"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import InputGroup from "@/components/form/input-custom-group"
import EmptyCart from "@/components/cart/empty-cart"
import DatePickerInput from "@/components/form/date-picker-input"
import { cn } from "@/lib/utils"
import { inputClass, optionLabelClass, optionLabelLikeBtnClass } from "@/components/form/styleConfig"
import { DELIVERY_OPTIONS, DELIVERY_TIME_OPTIONS } from "@/config/checkout"
import { useCart } from "@/hooks/queries/use-cart"
import { createCheckOutSchema, type CheckOutFormData } from "@/shema/zod"
import { useCreateOrder } from "@/hooks/mutations/use-create-order"

const getTimePlus90min = () => {
    const d = new Date()
    d.setMinutes(d.getMinutes() + 90)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const CheckOutForm = () => {
    const [mounted, setMounted] = useState(false)
    const { data: cart } = useCart()
    const t = useTranslations('validation')
    const schema = useMemo(() => createCheckOutSchema(t), [t])

    const { mutate: createOrder } = useCreateOrder()

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CheckOutFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            deliveryType: 'delivery',
            deliveryTime: 'in_time',
            date: new Date(),
            time: getTimePlus90min(),
            valuePerson: 1,
            birthdayDiscount: false,
            agreePolicy: false,
        },
    })

    const deliveryType = watch('deliveryType')
    const deliveryTime = watch('deliveryTime')
    const valuePerson = watch('valuePerson')
    const isAsap = deliveryTime === 'nearest_time'

    useEffect(() => { setMounted(true) }, [])

    const onSubmit = (data: CheckOutFormData) => {
        createOrder(data)
    }

    if (mounted && !cart?.items?.length) {
        return <EmptyCart description="Поверніться до меню та додайте страви" />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <h2 className="text-2xl font-bold mb-7">Оформити замовлення</h2>
            <div className="w-full grid grid-cols-2 gap-7">
                {/* left column */}
                <div>
                    <div className="flex gap-4 mb-7">
                        <div>
                            <InputGroup label="Ім'я">
                                <Input placeholder="Ім'я" className={inputClass} {...register('name')} />
                            </InputGroup>
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <InputGroup label="Телефон">
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <IMaskInput
                                            mask="+{38} 000 000 0000"
                                            placeholder="+ 380 XX XXX XXXX"
                                            className={inputClass}
                                            value={field.value ?? ''}
                                            onAccept={(val) => field.onChange(val)}
                                        />
                                    )}
                                />
                            </InputGroup>
                            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="mb-7">
                        <h4 className="text-xl font-bold mb-4">Доставка</h4>
                        <Controller
                            name="deliveryType"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex flex-col gap-2"
                                >
                                    {DELIVERY_OPTIONS.map(({ id, label }) => (
                                        <label key={id} htmlFor={id} className={optionLabelClass}>
                                            <div className="w-full flex items-center gap-2 px-3 py-2">
                                                <RadioGroupItem
                                                    id={id}
                                                    value={id}
                                                    className="rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
                                                />
                                                <span className="ms-2 select-none text-[inherit] font-semibold">
                                                    {label}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </RadioGroup>
                            )}
                        />

                        {deliveryType === 'delivery' && (
                            <div className="grid grid-cols-2 gap-7 mt-4">
                                <div>
                                    <InputGroup label="Місто">
                                        <Input placeholder="Місто" className={inputClass} {...register('cityId')} />
                                    </InputGroup>
                                    {errors.cityId && <p className="text-destructive text-xs mt-1">{errors.cityId.message}</p>}
                                </div>
                                <div>
                                    <InputGroup label="Вулиця">
                                        <Input placeholder="Вулиця" className={inputClass} {...register('street')} />
                                    </InputGroup>
                                    {errors.street && <p className="text-destructive text-xs mt-1">{errors.street.message}</p>}
                                </div>
                                <div>
                                    <InputGroup label="Будинок">
                                        <Input placeholder="Будинок" className={inputClass} {...register('house')} />
                                    </InputGroup>
                                    {errors.house && <p className="text-destructive text-xs mt-1">{errors.house.message}</p>}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full mb-7">
                        <Controller
                            name="deliveryTime"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="w-full flex gap-2"
                                >
                                    {DELIVERY_TIME_OPTIONS.map(({ id, label }) => (
                                        <label key={id} htmlFor={id} className={optionLabelLikeBtnClass}>
                                            <div className="w-full flex flex-auto items-center gap-2 py-1">
                                                <RadioGroupItem
                                                    id={id}
                                                    value={id}
                                                    className="sr-only hidden"
                                                />
                                                <span className="select-none text-[12px] font-regular">
                                                    {label}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="w-full flex gap-4 mb-7">
                        <InputGroup label="Дата" className="w-full">
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DatePickerInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={isAsap}
                                    />
                                )}
                            />
                        </InputGroup>
                        <InputGroup label="Час" className="w-full">
                            <Input type="time" className={cn(inputClass, isAsap && "opacity-50 cursor-not-allowed")} disabled={isAsap} {...register('time')} />
                        </InputGroup>
                    </div>

                    <Field orientation="horizontal" className="mt-4">
                        <Controller
                            name="birthdayDiscount"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    id="birthday-checkbox"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="bg-white cursor-pointer!"
                                />
                            )}
                        />
                        <FieldLabel htmlFor="birthday-checkbox" className="cursor-pointer">
                            Хочу знижку на день народження
                        </FieldLabel>
                    </Field>
                    <div className="text-xs mt-2">
                        Знижка надається за умови надання документу що підтверждує що в вас день народження
                    </div>
                </div>

                {/* right column */}
                <div>
                    <h2>Ваше замовлення</h2>
                    <div>
                        <div className="text-[16px]">
                            <div className="flex justify-between items-center border-b border-dashed pb-2 mb-2">
                                <div>Сума</div>
                                <div>{mounted ? (cart?.totalPrice ?? 0) : 0} грн</div>
                            </div>
                            <div className="flex justify-between items-end border-b border-dashed pb-2 mb-2">
                                <div>
                                    <span>Доставка</span>
                                    <span className="max-w-[150px] block text-foreground text-[12px]">
                                        До безкоштовної доставки залишилось 0 грн
                                    </span>
                                </div>
                                <div>100 грн</div>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed pb-2 mb-2">
                                <div>Разом</div>
                                <div>{mounted ? (cart ? cart.totalPrice + 100 : 0) : 0} грн</div>
                            </div>
                        </div>

                        <InputGroup label="Коментар до замовлення" className="mt-7 w-full">
                            <Textarea
                                placeholder="Наприклад: зателефонуйте за 30 хв до доставки"
                                className={inputClass}
                                {...register('comment')}
                            />
                        </InputGroup>

                        <div className="flex gap-2 items-center my-4">
                            <span className="text-sm font-semibold me-2">К-сть персон</span>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-[23px] h-[23px] bg-card hover:bg-primary border-y-0 border-x border-x-primary rounded-[5px]"
                                onClick={() => setValue('valuePerson', Math.max(1, valuePerson - 1))}
                            >
                                <Minus className="size-4" />
                            </Button>
                            <Input
                                type="number"
                                className="p-0 text-center max-w-[50px] border-0 outline-none shadow-none focus-visible:ring-0 focus-visible:border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={valuePerson}
                                readOnly
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-[23px] h-[23px] bg-card hover:bg-primary border-y-0 border-x border-x-primary rounded-[5px]"
                                onClick={() => setValue('valuePerson', valuePerson + 1)}
                            >
                                <Plus className="size-4" />
                            </Button>
                        </div>

                        <Field orientation="horizontal" className="my-4">
                            <Controller
                                name="agreePolicy"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="agree-policy"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="bg-white cursor-pointer!"
                                    />
                                )}
                            />
                            <FieldLabel htmlFor="agree-policy" className="cursor-pointer">
                                Згоден з політикою конфедеційности
                            </FieldLabel>
                        </Field>
                        {errors.agreePolicy && (
                            <p className="text-destructive text-xs mb-2">{errors.agreePolicy.message}</p>
                        )}

                        <Button
                            className="w-full h-fit py-[20px] font-semibold text-[16px] rounded-[45px] leading-[100%]"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Оформити замовлення
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CheckOutForm
