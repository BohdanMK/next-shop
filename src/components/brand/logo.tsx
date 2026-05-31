'use client'

import Image from "next/image"
import Link from "next/link"
import { useCompanyInfo } from "@/hooks/queries/use-company"
import { getImageUrl } from "@/lib/get-image-url"
import { ROUTES } from "@/config/routes"

const Logo = () => {
  const { data } = useCompanyInfo()

  const src = data?.companyLogo?.src ? getImageUrl(data.companyLogo.src) : "/logo.svg"
  const alt = data?.companyLogo?.alt ?? "Logo"

  return (
    <Link href={ROUTES.home} className="flex items-center gap-2 w-[85px] h-[85px] rounded-full overflow-hidden">
      <Image src={src} alt={alt} width={85} height={85} loading="eager" style={{ width: "auto", height: "auto" }} />
    </Link>
  )
}

export default Logo
