import Image from "next/image"
import { getImageUrl } from "@/lib/get-image-url"
import type { CompanyInfoBannerContent } from "@/types/dto/company.dto"

interface SliderItemProps {
  item: CompanyInfoBannerContent
}

export function SliderItem({ item }: SliderItemProps) {
  return (
    <div className="relative mx-2 h-[330px] flex items-center justify-center rounded-lg overflow-hidden bg-muted">
      {item.bgImage && (
        <Image
          src={getImageUrl(item.bgImage)}
          alt={item.bgImageAlt ?? ""}
          fill
          className="object-cover"
          priority
          unoptimized
          draggable={false}
        />
      )}
      <div className="relative z-10 flex items-center justify-center gap-8">
        {(item.title || item.subtitle) && (
          <div>
            {item.title && (
              <h2 className="text-center text-4xl font-bold text-white">
                {item.title}
              </h2>
            )}
            {item.subtitle && (
              <p className="text-center text-sm text-white">
                {item.subtitle}
              </p>
            )}
          </div>
        )}
        {item.image && (
          <Image
            src={getImageUrl(item.image)}
            alt={item.imageAlt ?? ""}
            width={300}
            height={230}
            className="mx-auto"
            priority
            unoptimized
            draggable={false}
          />
        )}
      </div>
    </div>
  )
}
