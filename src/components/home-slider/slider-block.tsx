'use client'
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { useCompanyInfo } from "@/hooks/queries/use-company"
import { SliderItem } from "./slider-item"
import { SliderControls } from "@/components/ui/slider-controls"
import 'swiper/css'

const SliderBlock = () => {
  const { data: companyInfo, isPending, isError } = useCompanyInfo()
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<SwiperType | undefined>(undefined)

  if (isPending) {
    return (
      <div className="flex w-full space-x-4 p-4 px-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-24 shrink-0 rounded bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (isError) return null

  const slides = companyInfo?.bannerContents
  if (!slides?.length) return null

  return (
    <div

      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <div className="lg:max-w-[992px] xxl:max-w-[100%] mx-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.4 },
            768: { slidesPerView: 1.0 },
          }}
          centeredSlides
          spaceBetween={16}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <SliderItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 && (
          <div className="container mx-auto">
            <SliderControls
              current={current}
              total={slides.length}
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
              onDotClick={(i) => swiperRef.current?.slideTo(i)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SliderBlock
