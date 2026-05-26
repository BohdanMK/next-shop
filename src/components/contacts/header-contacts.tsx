'use client'
import { useState } from "react"
import { cn } from "@/lib/utils"
import phonesList from "@/config/phones-list";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IHeaderContactsProps {
    className?: string
}

const HeaderContacts = ({ className }: IHeaderContactsProps) => {
    const [phone , setPhone] = useState<string>("0911234567")

    return (
        <div className="text-center">
            <Select
                value={phonesList[0].value} onValueChange={(value) => setPhone(value)}>
                <SelectTrigger className={cn("w-full border-0 border-primary bg-transparent font-bold cursor-pointer focus:ring-0! focus:outline-none!", className)}>
                    <SelectValue placeholder="Виберіть номер" />
                </SelectTrigger>
                <SelectContent className="font-bold" >
                    <SelectGroup>
                        { phonesList.map((item, index) => (
                            <SelectItem
                                className="cursor-pointer"
                                key={index}
                                value={item.value}
                            >{item.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default HeaderContacts