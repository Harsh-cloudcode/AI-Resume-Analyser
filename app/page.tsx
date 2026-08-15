"use client"

import { Users, CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { DashboardLayout } from "../components/dashboard-layout"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const stats = [
  {
    title: "Total Candidates",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Shortlisted",
    value: "847",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle,
    description: "vs last month",
  },
  {
    title: "Rejected",
    value: "1,234",
    change: "-3.1%",
    trend: "down",
    icon: XCircle,
    description: "vs last month",
  },
  {
    title: "Pending Review",
    value: "766",
    change: "+15.3%",
    trend: "up",
    icon: Clock,
    description: "vs last month",
  },
]

const applicationData = [
  { name: "Jan", applications: 400, shortlisted: 120 },
  { name: "Feb", applications: 300, shortlisted: 90 },
  { name: "Mar", applications: 500, shortlisted: 150 },
  { name: "Apr", applications: 450, shortlisted: 135 },
  { name: "May", applications: 600, shortlisted: 180 },
  { name: "Jun", applications: 550, shortlisted: 165 },
  { name: "Jul", applications: 700, shortlisted: 210 },
]

const scoreDistribution = [
  { score: "0-20", count: 45 },
  { score: "21-40", count: 120 },
  { score: "41-60", count: 350 },
  { score: "61-80", count: 520 },
  { score: "81-100", count: 210 },
]

const recentCandidates = [
  { name: "Sarah Johnson", role: "Senior Developer", score: 92, status: "shortlisted" },
  { name: "Michael Chen", role: "Product Designer", score: 78, status: "pending" },
  { name: "Emily Davis", role: "Data Analyst", score: 85, status: "shortlisted" },
  { name: "James Wilson", role: "DevOps Engineer", score: 45, status: "rejected" },
  { name: "Lisa Anderson", role: "Frontend Developer", score: 88, status: "pending" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your recruitment pipeline</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-7">
          <Card className="bg-card border-border lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-foreground">Applications Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={applicationData}>
                    <defs>
                      <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                    <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.18 0.005 260)",
                        border: "1px solid oklch(0.28 0.005 260)",
                        borderRadius: "8px",
                        color: "oklch(0.97 0 0)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      stroke="oklch(0.65 0.2 160)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorApplications)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-foreground">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                    <XAxis dataKey="score" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.18 0.005 260)",
                        border: "1px solid oklch(0.28 0.005 260)",
                        borderRadius: "8px",
                        color: "oklch(0.97 0 0)",
                      }}
                    />
                    <Bar dataKey="count" fill="oklch(0.7 0.15 200)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Candidates */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCandidates.map((candidate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {candidate.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{candidate.score}/100</p>
                      <p className="text-xs text-muted-foreground">Resume Score</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        candidate.status === "shortlisted"
                          ? "bg-success/20 text-success"
                          : candidate.status === "rejected"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-warning/20 text-warning"
                      }`}
                    >
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
