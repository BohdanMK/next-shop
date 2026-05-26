// src/hooks/use-header-height.ts
import { useEffect, useRef } from "react"

export const useHeaderHeight = () => {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref.current) {
            document.documentElement.style.setProperty(
                '--header-height',
                `${ref.current.offsetHeight}px`
            )
        }
    }, [])

    return ref
}