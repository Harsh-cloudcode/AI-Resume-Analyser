"use client"

import { useState, useEffect } from "react"
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


// const candidates = [
//   {
//     id: "1",
//     name: "Sarah Johnson",
//     email: "sarah.johnson@email.com",
//     role: "Senior Developer",
//     experience: "8 years",
//     score: 92,
//     status: "shortlisted",
//     appliedDate: "2024-01-15",
//   },
//   {
//     id: "2",
//     name: "Michael Chen",
//     email: "michael.chen@email.com",
//     role: "Product Designer",
//     experience: "5 years",
//     score: 78,
//     status: "pending",
//     appliedDate: "2024-01-14",
//   },
//   {
//     id: "3",
//     name: "Emily Davis",
//     email: "emily.davis@email.com",
//     role: "Data Analyst",
//     experience: "4 years",
//     score: 85,
//     status: "shortlisted",
//     appliedDate: "2024-01-13",
//   },
//   {
//     id: "4",
//     name: "James Wilson",
//     email: "james.wilson@email.com",
//     role: "DevOps Engineer",
//     experience: "6 years",
//     score: 45,
//     status: "rejected",
//     appliedDate: "2024-01-12",
//   },
//   {
//     id: "5",
//     name: "Lisa Anderson",
//     email: "lisa.anderson@email.com",
//     role: "Frontend Developer",
//     experience: "3 years",
//     score: 88,
//     status: "pending",
//     appliedDate: "2024-01-11",
//   },
//   {
//     id: "6",
//     name: "Robert Martinez",
//     email: "robert.martinez@email.com",
//     role: "Backend Developer",
//     experience: "7 years",
//     score: 91,
//     status: "shortlisted",
//     appliedDate: "2024-01-10",
//   },
//   {
//     id: "7",
//     name: "Amanda Taylor",
//     email: "amanda.taylor@email.com",
//     role: "UX Researcher",
//     experience: "4 years",
//     score: 72,
//     status: "pending",
//     appliedDate: "2024-01-09",
//   },
//   {
//     id: "8",
//     name: "David Brown",
//     email: "david.brown@email.com",
//     role: "Full Stack Developer",
//     experience: "5 years",
//     score: 38,
//     status: "rejected",
//     appliedDate: "2024-01-08",
//   },
// ]

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

  
const [roleFilter, setRoleFilter] = useState("all");

const [candidates, setCandidates] = useState<any[]>([])
const [loading, setLoading] = useState(true)

// useEffect(() => {
//   // fetch("http://127.0.0.1:8000/candidates")

//   fetch(`${import.meta.env.VITE_API_URL}/candidates`)
//     .then((res) => res.json())
//     .then((data) => setCandidates(data))
//     .catch((err) => console.error(err))
// }, [])



  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/candidates`)

  console.log("API URL:", API_URL);

  fetch(`${API_URL}/candidates`)
    .then((res) => {
      console.log("Status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      console.log("Candidates from API:", data);
      setCandidates(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch candidates:", err);
      setLoading(false);
    });
}, []);






//   const filteredCandidates = candidates.filter((candidate) => {
//   const matchesSearch =
//     candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

//   const matchesRole =
//     roleFilter === "all" ||
//     candidate.role === roleFilter;

//   const matchesStatus =
//     statusFilter === "all" ||
//     candidate.status.toLowerCase() === statusFilter.toLowerCase();

//   return matchesSearch && matchesRole && matchesStatus;
// });


const filteredCandidates = candidates.filter((candidate) => {
  const name = candidate.name || candidate.filename || ""
  const email = candidate.email || ""
  const role = candidate.role || ""
  


  const score =
  candidate.score ??
  candidate.analysis_report?.overall_score ??
  0;
  const status = score > 75 ? "Shortlisted" : "Rejected";

  const matchesSearch =
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.toLowerCase().includes(searchQuery.toLowerCase())

  const matchesRole =
    roleFilter === "all" ||
    role === roleFilter

  const matchesStatus =
    statusFilter === "all" ||
    status.toLowerCase() === statusFilter.toLowerCase()

  return matchesSearch && matchesRole && matchesStatus
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
                
                <Select
  value={roleFilter}
  onValueChange={(value) => setRoleFilter(value ?? "all")}
>
  <SelectTrigger className="w-full sm:w-40 bg-secondary border-0">
    <Filter className="h-4 w-4 mr-2" />
    <SelectValue placeholder="Filter by role" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="all">All Roles</SelectItem>

    <SelectItem value="Senior Developer">Senior Developer</SelectItem>
    <SelectItem value="Product Designer">Product Designer</SelectItem>
    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
    <SelectItem value="UX Researcher">UX Researcher</SelectItem>
    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
  </SelectContent>
</Select>
                 
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64 bg-secondary border-0"
                  />
                </div>
                <Select
  value={statusFilter}
  onValueChange={(value) => setStatusFilter(value ?? "all")}
>
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
                    <TableHead className="text-muted-foreground">Experience</TableHead>
                    <TableHead className="text-muted-foreground">Resume Score</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Applied</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                   <TableBody>
  {filteredCandidates.map((candidate) => {

    const name =
      candidate.name ||
      candidate.analysis_report?.candidate?.name ||
      candidate.filename ||
      "Candidate";

    const email =
      candidate.email ||
      candidate.analysis_report?.candidate?.email ||
      "N/A";

    const experience =
      candidate.experience ||
      candidate.analysis_report?.candidate?.experience ||
      "Not specified";

    const score =
      candidate.score ??
      candidate.analysis_report?.overall_score ??
      0;

    return (
      <TableRow
        key={candidate._id}
        className="hover:bg-secondary/30"
      >

        {/* Candidate Name + Email */}
        <TableCell>
          <div className="flex items-center gap-3">

            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                {name}
              </p>

              <p className="text-xs text-muted-foreground">
                {email}
              </p>
            </div>

          </div>
        </TableCell>


        {/* Experience */}
        <TableCell className="text-muted-foreground">
           {experience.length > 5
    ? experience.slice(0, 5) + "..."
    : experience}
        </TableCell>


        {/* Resume Score */}
        <TableCell>
          <span
            className={`font-semibold ${getScoreColor(score)}`}
          >
            {score}/100
          </span>
        </TableCell>


        {/* Status */}
        <TableCell>
          {getStatusBadge(status)}
        </TableCell>


        {/* Applied Date */}
        <TableCell className="text-muted-foreground">
          {candidate.appliedDate || "N/A"}
        </TableCell>


        {/* Actions */}
        <TableCell className="text-right">
          <DropdownMenu>

            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>


            <DropdownMenuContent align="end">

              {/* View Analysis */}
              <DropdownMenuItem>
                <Link to={`/analysis?id=${candidate._id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Analysis
                </Link>
              </DropdownMenuItem>


              {/* Download Resume */}
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </DropdownMenuItem>


              {/* Delete */}
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
        </TableCell>

      </TableRow>
    );
  })}
</TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
