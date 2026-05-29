import { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadCrumbsListProps {
  list: Array<{ name: string, href?: string }>
}

const BreadCrumbsList = ({ list }: BreadCrumbsListProps) => {
  return (
    <Breadcrumb className="flex items-center gap-2">
      <BreadcrumbList>
        {list.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem className="text-foreground">
              {item.href
                ? <BreadcrumbLink href={item.href} className="hover:!text-primary">{item.name}</BreadcrumbLink>
                : <span>{item.name}</span>
              }
            </BreadcrumbItem>
            {index < list.length - 1 && <BreadcrumbSeparator className="text-foreground" />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbsList