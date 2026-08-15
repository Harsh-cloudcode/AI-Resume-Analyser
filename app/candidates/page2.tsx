"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, Download, Trash2 } from "lucide-react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { DashboardLayout } from "../../components/dashboard-layout"
import { Link } from "react-router-dom";

const candidates = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "Senior Developer",
    experience: "8 years",
    score: 92,
    status: "shortlisted",
    appliedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "Product Designer",
    experience: "5 years",
    score: 78,
    status: "pending",
    appliedDate: "2024-01-14",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    role: "Data Analyst",
    experience: "4 years",
    score: 85,
    status: "shortlisted",
    appliedDate: "2024-01-13",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    role: "DevOps Engineer",
    experience: "6 years",
    score: 45,
    status: "rejected",
    appliedDate: "2024-01-12",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    role: "Frontend Developer",
    experience: "3 years",
    score: 88,
    status: "pending",
    appliedDate: "2024-01-11",
  },
  {
    id: "6",
    name: "Robert Martinez",
    email: "robert.martinez@email.com",
    role: "Backend Developer",
    experience: "7 years",
    score: 91,
    status: "shortlisted",
    appliedDate: "2024-01-10",
  },
  {
    id: "7",
    name: "Amanda Taylor",
    email: "amanda.taylor@email.com",
    role: "UX Researcher",
    experience: "4 years",
    score: 72,
    status: "pending",
    appliedDate: "2024-01-09",
  },
  {
    id: "8",
    name: "David Brown",
    email: "david.brown@email.com",
    role: "Full Stack Developer",
    experience: "5 years",
    score: 38,
    status: "rejected",
    appliedDate: "2024-01-08",
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

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Candidates</h1>
          <p className="text-muted-foreground">Manage and review all job applicants</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-foreground">All Candidates</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64 bg-secondary border-0"
                  />
                </div>
                <Select value={statusFilter} >
                  <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
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
                    <TableHead className="text-muted-foreground">Experience</TableHead>
                    <TableHead className="text-muted-foreground">Resume Score</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Applied</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id} className="hover:bg-secondary/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {candidate.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{candidate.role}</TableCell>
                      <TableCell className="text-muted-foreground">{candidate.experience}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getScoreColor(candidate.score)}`}>
                          {candidate.score}/100
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{candidate.appliedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger >
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                              <Link to={`/analysis?id=${candidate.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Analysis
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
