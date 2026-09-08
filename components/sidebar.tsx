"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileSearch,
  HelpCircle,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Brain,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"

const navItems = [
  // { label: "Dashboard", href: "/", icon: LayoutDashboard },
  // { label: "Candidates", href: "/candidates", icon: Users },
  // { label: "Resume Analysis", href: "/analysis", icon: FileSearch },
  // { label: "Question Bank", href: "/questions", icon: HelpCircle },
  // { label: "Analytics", href: "/analytics", icon: BarChart3 },
  // { label: "History", href: "/history", icon: History },
  // { label: "Settings", href: "/settings", icon: Settings },

    { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Question Bank", href: "/questions", icon: HelpCircle },
  // { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Resume Analysis", href: "/analysis", icon: FileSearch },
  { label: "Candidates", href: "/candidates", icon: Users },
  // { label: "History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = location.pathname

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger  className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar p-0 border-sidebar-border">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">ResumeAI</span>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-16 items-center border-b border-sidebar-border",
              collapsed ? "justify-center px-2" : "gap-2 px-4"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">ResumeAI</span>
            )}
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    collapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-sidebar-border p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "w-full text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed ? "justify-center px-0" : "justify-start"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
