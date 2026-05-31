'use client'

import { useState } from "react"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { inputClass } from "@/components/form/styleConfig"

interface DatePickerInputProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

const DatePickerInput = ({ value, onChange, placeholder = "Оберіть дату", className, disabled }: DatePickerInputProps) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className={cn(inputClass, "flex items-center justify-between gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}
                >
                    <span className={cn(!value && "text-muted")}>
                        {value ? format(value, "dd.MM.yyyy", { locale: uk }) : placeholder}
                    </span>
                    <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange?.(date)
                        setOpen(false)
                    }}
                    locale={uk}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerInput
