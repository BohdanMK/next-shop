'use client'
import{ useState } from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Logo from "@/components/brand/logo"
import { Button } from "@/components/ui/button";
import { locationsList } from "@/config/locations-list";

interface ICurrentLocationProps {
    className?: string
    buttonVariant?: "text" | "outline"
}

const CurrentLocation = ({ className, buttonVariant }: ICurrentLocationProps) => {
    const [ location, setLocation ] = useState<string>("")

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={buttonVariant ?? "text"}
                    className={cn("font-semibold", className)}
                >
                    {locationsList.find(item => item.value === location)?.label ?? "Оберіть місто"}
                </Button>
            </DialogTrigger>
            <DialogContent className="[--radius:16px]">
                <DialogHeader>
                    <div className="w-full text-center flex flex-col items-center gap-4">
                        <Logo />
                        <DialogTitle
                            className="font-bold text-[14px]"
                        >Оберіть місто</DialogTitle>
                    </div>
                </DialogHeader>
                 <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full border-2 border-primary rounded-3xl border-t-0 border-b-0 bg-primary/10 font-bold">
                        <SelectValue placeholder="Оберіть місто" />
                    </SelectTrigger>
                    <SelectContent className="font-bold" >
                        <SelectGroup>
                            { locationsList.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                >{item.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </DialogContent>
        </Dialog>
    )

}

export default CurrentLocation