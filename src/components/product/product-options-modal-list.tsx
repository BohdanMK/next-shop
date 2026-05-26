"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { IProductDTO } from "@/types/dto/product.dto"
import { cn } from "@/lib/utils"

interface IProductOptionsCheckboxProps {
  product: IProductDTO
}

const optionLabelClass = cn(
  "flex cursor-pointer items-center justify-between rounded-full px-4 py-3 transition-all border border-transparent",
  "bg-secondary text-foreground",
  "hover:bg-secondary/80 hover:border-primary hover:text-foreground",
)

const Extras = ({ product }: IProductOptionsCheckboxProps) => {
  const [selectedMultiple, setSelectedMultiple] = React.useState<string[]>([])
  const [selectedSingle, setSelectedSingle] = React.useState<Record<string, string>>({})

  const toggle = (id: string) => {
    setSelectedMultiple((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  if (!product?.optionGroups) return null

  return (
    <div className="space-y-3">
      <div className="max-h-[300px] flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        {product.optionGroups.map((item) => {
          if (item.type !== "single") {
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <h3>{item.name}:</h3>
                {item.values.map((value) => (
                  <div key={value.id}>
                    <Checkbox
                      id={value.id}
                      checked={selectedMultiple.includes(value.id)}
                      onCheckedChange={() => toggle(value.id)}
                      className="sr-only hidden"
                    />
                    <label
                      htmlFor={value.id}
                      className={cn(
                        optionLabelClass,
                        selectedMultiple.includes(value.id) && "border border-primary"
                      )}
                    >
                      <span>{value.label}</span>
                      {value.extraPrice && (
                        <span>+{value.extraPrice.amount} {value.extraPrice.currency}</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            )
          } else {
            return (
              <RadioGroup
                key={item.id}
                value={selectedSingle[item.id] ?? ""}
                onValueChange={(val) =>
                  setSelectedSingle((prev) => ({ ...prev, [item.id]: val }))
                }

              >
                <div className="flex  flex-col gap-2 mb-3">
                  <h3 className="me-4">{item.name}:</h3>
                  {item.values.map((value) => (
                    <div key={value.id}>
                      <RadioGroupItem id={value.id} value={value.id} className="sr-only hidden" />
                      <label
                        htmlFor={value.id}
                        className={cn(
                          optionLabelClass,
                          selectedSingle[item.id] === value.id && "border border-primary"
                        )}
                      >
                        <span>{value.label}</span>
                        {value.extraPrice && (
                          <span>+{value.extraPrice.amount} {value.extraPrice.currency}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Extras
