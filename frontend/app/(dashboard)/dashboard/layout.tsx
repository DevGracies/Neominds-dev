"use client"
import {ProtectedLayout} from "@/components/layout/ProtectedLayout"
import { ReactNode } from "react"

export const DashboardLayout = ({children} : {children: ReactNode}) => {
    return (
        <ProtectedLayout>
            {children}
        </ProtectedLayout>
    )
}