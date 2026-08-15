"use client"


import { Sidebar } from "../components/sidebar"
import { Navbar } from "../components/navbar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <Navbar />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout;

