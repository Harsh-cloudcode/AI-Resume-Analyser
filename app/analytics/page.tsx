"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { DashboardLayout } from "../../components/dashboard-layout"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from "recharts"

const applicationTrend = [
  { month: "Jan", applications: 320, shortlisted: 96, rejected: 180 },
  { month: "Feb", applications: 280, shortlisted: 84, rejected: 156 },
  { month: "Mar", applications: 420, shortlisted: 126, rejected: 231 },
  { month: "Apr", applications: 380, shortlisted: 114, rejected: 209 },
  { month: "May", applications: 520, shortlisted: 156, rejected: 286 },
  { month: "Jun", applications: 480, shortlisted: 144, rejected: 264 },
  { month: "Jul", applications: 640, shortlisted: 192, rejected: 352 },
]

const statusDistribution = [
  { name: "Shortlisted", value: 847, color: "oklch(0.7 0.18 145)" },
  { name: "Rejected", value: 1234, color: "oklch(0.65 0.2 25)" },
  { name: "Pending", value: 766, color: "oklch(0.75 0.15 80)" },
]

const roleDistribution = [
  { role: "Developer", count: 892 },
  { role: "Designer", count: 456 },
  { role: "Data Analyst", count: 378 },
  { role: "DevOps", count: 289 },
  { role: "PM", count: 234 },
  { role: "Other", count: 598 },
]

const averageScoreByRole = [
  { role: "Developer", score: 72 },
  { role: "Designer", score: 68 },
  { role: "Data Analyst", score: 75 },
  { role: "DevOps", score: 71 },
  { role: "PM", score: 74 },
]

const selectionRate = [
  { month: "Jan", rate: 30 },
  { month: "Feb", rate: 30 },
  { month: "Mar", rate: 30 },
  { month: "Apr", rate: 30 },
  { month: "May", rate: 30 },
  { month: "Jun", rate: 30 },
  { month: "Jul", rate: 30 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Insights and metrics for your recruitment pipeline</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-foreground">29.7%</div>
              <p className="text-sm text-muted-foreground">Selection Rate</p>
              <p className="text-xs text-success mt-1">+2.3% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-foreground">72.4</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-xs text-success mt-1">+1.5 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-foreground">3.2 days</div>
              <p className="text-sm text-muted-foreground">Avg. Review Time</p>
              <p className="text-xs text-destructive mt-1">+0.4 days from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-foreground">847</div>
              <p className="text-sm text-muted-foreground">Shortlisted This Month</p>
              <p className="text-xs text-success mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Application Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={applicationTrend}>
                    <defs>
                      <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                    <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} />
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
                      fill="url(#colorApps)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.18 0.005 260)",
                        border: "1px solid oklch(0.28 0.005 260)",
                        borderRadius: "8px",
                        color: "oklch(0.97 0 0)",
                      }}
                    />
                    <Legend
                      formatter={(value) => <span style={{ color: "oklch(0.97 0 0)" }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Applications by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                    <XAxis type="number" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis dataKey="role" type="category" stroke="oklch(0.65 0 0)" fontSize={12} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.18 0.005 260)",
                        border: "1px solid oklch(0.28 0.005 260)",
                        borderRadius: "8px",
                        color: "oklch(0.97 0 0)",
                      }}
                    />
                    <Bar dataKey="count" fill="oklch(0.7 0.15 200)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Average Score by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={averageScoreByRole}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                    <XAxis dataKey="role" stroke="oklch(0.65 0 0)" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="oklch(0.65 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.18 0.005 260)",
                        border: "1px solid oklch(0.28 0.005 260)",
                        borderRadius: "8px",
                        color: "oklch(0.97 0 0)",
                      }}
                    />
                    <Bar dataKey="score" fill="oklch(0.65 0.2 160)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selection Rate Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Selection Rate Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectionRate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.005 260)" />
                  <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} />
                  <YAxis domain={[0, 50]} stroke="oklch(0.65 0 0)" fontSize={12} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.18 0.005 260)",
                      border: "1px solid oklch(0.28 0.005 260)",
                      borderRadius: "8px",
                      color: "oklch(0.97 0 0)",
                    }}
                    formatter={(value: number) => [`${value}%`, "Selection Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="oklch(0.65 0.2 160)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.65 0.2 160)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
