"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { IProductDTO, ProductOptionGroupDTO, ProductOptionValueDTO } from "@/types/dto/product.dto"
import { cn } from "@/lib/utils"

interface IProductOptionsModalListProps {
  product: IProductDTO,
  scrollable?: boolean
  onSelectionChange: (options: ProductOptionValueDTO[]) => void
}

const optionLabelClass = cn(
  "flex cursor-pointer items-center justify-between rounded-full px-4 py-3 transition-all border border-transparent",
  "bg-secondary text-foreground",
  "hover:bg-secondary/80 hover:border-primary hover:text-foreground",
)

const ProductOptionsModalList = ({ product, onSelectionChange, scrollable = true }: IProductOptionsModalListProps) => {
  const [selectedOptions, setSelectedOptions] = useState<ProductOptionValueDTO[]>([])

  const update = (next: ProductOptionValueDTO[]) => {
    setSelectedOptions(next)
    onSelectionChange(next)
  }

  const toggle = (value: ProductOptionValueDTO) => {
    const isSelected = selectedOptions.some((o) => o.id === value.id)
    update(isSelected ? selectedOptions.filter((o) => o.id !== value.id) : [...selectedOptions, value])
  }

  const selectSingle = (group: ProductOptionGroupDTO, valueId: string) => {
    const groupValueIds = group.values.map((v) => v.id)
    const value = group.values.find((v) => v.id === valueId)!
    update([...selectedOptions.filter((o) => !groupValueIds.includes(o.id)), value])
  }

  if (!product?.optionGroups) return null

  return (
    <div className="space-y-3">
      <div
        className={cn(
            "w-full",
            scrollable && " max-h-[300px] flex flex-col gap-4 overflow-y-auto custom-scrollbar"
          )}
        >
        {product.optionGroups.map((group) => {
          if (group.type !== "single") {
            return (
              <div key={group.id} className="flex flex-col gap-3 mt-2">
                <h3>{group.name}:</h3>
                {group.values.map((value) => (
                  <div key={value.id}>
                    <Checkbox
                      id={value.id}
                      checked={selectedOptions.some((o) => o.id === value.id)}
                      onCheckedChange={() => toggle(value)}
                      className="sr-only hidden"
                    />
                    <label
                      htmlFor={value.id}
                      className={cn(
                        optionLabelClass,
                        selectedOptions.some((o) => o.id === value.id) && "border border-primary"
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
            const selectedInGroup = selectedOptions.find((o) =>
              group.values.some((v) => v.id === o.id)
            )
            return (
              <RadioGroup
                key={group.id}
                value={selectedInGroup?.id ?? ""}
                onValueChange={(val) => selectSingle(group, val)}
              >
                <div className="flex flex-col gap-2 mb-3 mt-3">
                  <h3 className="me-4">{group.name}:</h3>
                  {group.values.map((value) => (
                    <div key={value.id}>
                      <RadioGroupItem id={value.id} value={value.id} className="sr-only hidden" />
                      <label
                        htmlFor={value.id}
                        className={cn(
                          optionLabelClass,
                          selectedInGroup?.id === value.id && "border border-primary"
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

export default ProductOptionsModalList
