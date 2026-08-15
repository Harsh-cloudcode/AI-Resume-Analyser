"use client"

import { useState } from "react"
import { Search, Eye, Download, Calendar, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { DashboardLayout } from "../../components/dashboard-layout"
import { Link } from "react-router-dom";

const historyData = [
  {
    id: "1",
    candidate: "Sarah Johnson",
    role: "Senior Developer",
    score: 92,
    status: "shortlisted",
    analyzedDate: "2024-01-15",
    analyzedBy: "John Doe",
  },
  {
    id: "2",
    candidate: "Michael Chen",
    role: "Product Designer",
    score: 78,
    status: "pending",
    analyzedDate: "2024-01-14",
    analyzedBy: "Jane Smith",
  },
  {
    id: "3",
    candidate: "Emily Davis",
    role: "Data Analyst",
    score: 85,
    status: "shortlisted",
    analyzedDate: "2024-01-13",
    analyzedBy: "John Doe",
  },
  {
    id: "4",
    candidate: "James Wilson",
    role: "DevOps Engineer",
    score: 45,
    status: "rejected",
    analyzedDate: "2024-01-12",
    analyzedBy: "Jane Smith",
  },
  {
    id: "5",
    candidate: "Lisa Anderson",
    role: "Frontend Developer",
    score: 88,
    status: "shortlisted",
    analyzedDate: "2024-01-11",
    analyzedBy: "John Doe",
  },
  {
    id: "6",
    candidate: "Robert Martinez",
    role: "Backend Developer",
    score: 91,
    status: "shortlisted",
    analyzedDate: "2024-01-10",
    analyzedBy: "Jane Smith",
  },
  {
    id: "7",
    candidate: "Amanda Taylor",
    role: "UX Researcher",
    score: 72,
    status: "pending",
    analyzedDate: "2024-01-09",
    analyzedBy: "John Doe",
  },
  {
    id: "8",
    candidate: "David Brown",
    role: "Full Stack Developer",
    score: 38,
    status: "rejected",
    analyzedDate: "2024-01-08",
    analyzedBy: "Jane Smith",
  },
  {
    id: "9",
    candidate: "Jennifer Lee",
    role: "Mobile Developer",
    score: 82,
    status: "shortlisted",
    analyzedDate: "2024-01-07",
    analyzedBy: "John Doe",
  },
  {
    id: "10",
    candidate: "Christopher White",
    role: "QA Engineer",
    score: 67,
    status: "pending",
    analyzedDate: "2024-01-06",
    analyzedBy: "Jane Smith",
  },
]

function getScoreColor(score: number) {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

function getStatusBadge(status: string) {
  switch (status) {
    case "shortlisted":
      return <Badge className="bg-success/20 text-success border-0">Shortlisted</Badge>
    case "rejected":
      return <Badge className="bg-destructive/20 text-destructive border-0">Rejected</Badge>
    default:
      return <Badge className="bg-warning/20 text-warning border-0">Pending</Badge>
  }
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      item.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">History</h1>
          <p className="text-muted-foreground">View all previous resume analyses</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{historyData.length}</div>
              <p className="text-sm text-muted-foreground">Total Analyses</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">
                {historyData.filter((h) => h.status === "shortlisted").length}
              </div>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">
                {historyData.filter((h) => h.status === "rejected").length}
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">
                {historyData.filter((h) => h.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-foreground">Analysis History</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64 bg-secondary border-0"
                  />
                </div>
                <Select value={statusFilter} >
                  <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="text-muted-foreground">Candidate</TableHead>
                    <TableHead className="text-muted-foreground">Role</TableHead>
                    <TableHead className="text-muted-foreground">Score</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Analyzed Date</TableHead>
                    <TableHead className="text-muted-foreground">Analyzed By</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-secondary/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {item.candidate.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{item.candidate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.role}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getScoreColor(item.score)}`}>
                          {item.score}/100
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.analyzedDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.analyzedBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Link to ={`/analysis?id=${item.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
