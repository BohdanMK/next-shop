'use client'
import Link from "next/link"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Button } from "@/components/ui/button";
import type { IProductDTO } from "@/types/dto/product.dto"
import { SliderControls } from "@/components/ui/slider-controls"
import ProductCard from "./product-card"

interface ProductSliderProps {
  products: IProductDTO[],
  blockTitle?: string,
  showAllHref?: string | null
  onAddToCart?: (optionGroups: IProductDTO['optionGroups']) => void
}

const getSpv = (swiper: SwiperType): number => {
  const v = swiper.params.slidesPerView
  return typeof v === 'number' ? Math.floor(v) : 1
}

const ProductSlider = ({ products, onAddToCart, showAllHref, blockTitle }: ProductSliderProps) => {
  const [current, setCurrent] = useState(0)
  const [spv, setSpv] = useState(1)
  const swiperRef = useRef<SwiperType | undefined>(undefined)

  if (!products.length) return null

  const updateState = (swiper: SwiperType) => {
    setCurrent(swiper.realIndex)
    setSpv(getSpv(swiper))
  }

  const currentPage = Math.floor(current / spv)
  const totalPages = Math.ceil(products.length / spv)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-center text-2xl font-bold text-white">{blockTitle}</h2>
        {showAllHref && (
          <Button
            className="text-white rounded-full px-4 py-2 font-normal hover:bg-primary border-primary border-2"
            variant="outline"
            asChild
          >
            <Link href={showAllHref}>Показати всі</Link>
          </Button>
        )}
      </div>
      <div
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 }

          }}
          spaceBetween={16}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; updateState(swiper) }}
          onSlideChange={updateState}
          onBreakpoint={updateState}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id ?? product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </SwiperSlide>
          ))}
        </Swiper>

        {totalPages > 1 && (
          <SliderControls
            current={currentPage}
            total={totalPages}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            onDotClick={(i) => swiperRef.current?.slideTo(i * spv)}
          />
        )}
      </div>
    </div>
  )
}

export default ProductSlider
