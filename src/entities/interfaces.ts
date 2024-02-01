import { ReactNode } from "react"

export interface RoutesInterface {
    title: string
    link: string
    icon: ReactNode
    iconActive: ReactNode
    iconMobile: ReactNode
    iconActiveMobile: ReactNode
    component: ReactNode
    children?: RoutesInterface[]
}

export interface LibrarySkillInterface {
    image: string
    label: string
    sublabel: string
    ratings: number
    ratingsCount: number
}