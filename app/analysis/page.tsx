"use client"
import { CheckCircle, XCircle, AlertCircle, ThumbsUp, ThumbsDown, Star, Upload  } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card" 
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useState, useEffect } from "react";

import ResumeUpload from '../../components/ui/upload_btn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { DashboardLayout } from "../../components/dashboard-layout"


export default function AnalysisPage() {

   const [analysisData, setAnalysisData] = useState<any>(null);
   
  const score = analysisData?.analysis_report?.overall_score ?? 0

const isShortlisted = score >= 65


  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const candidateId = params.get("id");

  if (!candidateId) {
    console.error("No candidate ID found in URL");
    return;
  }

  console.log("Fetching candidate:", candidateId);

  fetch(`${import.meta.env.VITE_API_URL}/candidates/${candidateId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Candidate data:", data);
      setAnalysisData(data);
    })
    .catch((err) => {
      console.error("Failed to fetch candidate:", err);
    });
}, []);
  return (

    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resume Analysis</h1>
            <p className="text-muted-foreground">AI-powered candidate evaluation</p>
          </div>

            <div className="flex flex-wrap items-center gap-2">
  {/* Separate Upload Component Connection */}
  {/* <ResumeUpload onUploadSuccess={(data) => console.log("Parsed:", data)} /> */}

    <ResumeUpload
  onUploadSuccess={(data) => {
    console.log("Parsed:", data);
    setAnalysisData(data);
  }}

  
/>

 
</div>

            
          
          <div className="flex gap-2">

  {isShortlisted ? (
    <Button className="bg-green-600 text-white hover:bg-green-700">
      <ThumbsUp className="h-4 w-4 mr-2" />
      Shortlisted
    </Button>
  ) : (
    <Button
      variant="outline"
      className="border-red-500 text-red-500 hover:bg-red-500/10"
    >
      <ThumbsDown className="h-4 w-4 mr-2" />
      Rejected
    </Button>
  )}

</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Candidate Profile */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Candidate Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">SJ</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {/* {candidate.name} */}
                    {analysisData?.analysis_report?.candidate?.name || "N/A"}
                    </h3>
                  <p className="text-sm text-muted-foreground">
                    {/* {candidate.role} */}
                     {analysisData?.analysis_report?.candidate?.role || "N/A"}
                    </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">
                    {/* {candidate.email} */}
                      {analysisData?.analysis_report?.candidate?.email || "N/A"}
                    </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">
                    {/* {candidate.phone} */}
                      {analysisData?.analysis_report?.candidate?.phone || "N/A"}
                    </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="text-foreground">
                    {/* {candidate.experience} */}
                     {analysisData?.analysis_report?.candidate?.experience || "N/A"}
                    </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">
                    {/* {candidate.location} */}
                      {analysisData?.analysis_report?.candidate?.location || "N/A"}
                    </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Score */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Resume Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-32 w-32 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="oklch(0.22 0.005 260)"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="oklch(0.65 0.2 160)"
                      strokeWidth="3"
                      // strokeDasharray={`${candidate.score}, 100`}
                      strokeDasharray={`${analysisData?.analysis_report?.overall_score || 0}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      {/* {candidate.score} */}
                       {analysisData?.analysis_report?.overall_score || 0}
                      </span>
                    <span className="text-xs text-muted-foreground">out of 100</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {/* {scoreBreakdown.map((item) => ( */}{(analysisData?.analysis_report?.score_breakdown || []).map((item: any) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.category}</span>
                      <span className="text-foreground font-medium">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                AI Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-success/20 text-success border-0 text-base px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {/* Highly Recommended */}
                  {analysisData?.analysis_report?.recommendation?.status || "N/A"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {analysisData?.analysis_report?.recommendation?.summary || "N/A"}
              </p>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Key Insight:</span> 
                  {" "}
  {analysisData?.analysis_report?.recommendation?.key_insight || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="strengths" className="w-full boxex">
          <TabsList className="bg-secondary">
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
            <TabsTrigger value="evaluation">Question Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="strengths" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {/* {strengths.map((strength, index) => ( */}
                  {(analysisData?.analysis_report?.strengths || []).map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-success" />
                      </div>
                      <span className="text-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weaknesses" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {/* {weaknesses.map((weakness, index) => ( */}
                  {(analysisData?.analysis_report?.weaknesses || []).map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-warning/20 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="h-3.5 w-3.5 text-warning" />
                      </div>
                      <span className="text-foreground">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Question Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
              

                <div className="rounded-lg border border-border overflow-hidden">
  <Table className="table-fixed w-full">
   <TableHeader>
  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
    <TableHead className="text-muted-foreground w-[35%]">
      Question
    </TableHead>

    <TableHead className="text-muted-foreground w-[35%]">
      Answer
    </TableHead>

    <TableHead className="text-muted-foreground w-[10%]">
      Weight
    </TableHead>

    <TableHead className="text-muted-foreground w-[20%]">
      AI Feedback
    </TableHead>
  </TableRow>
</TableHeader>

    <TableBody>
  {(analysisData?.analysis_report?.questions || []).map(
    (item: any, index: number) => (
      <TableRow
        key={index}
        className="hover:bg-secondary/30"
      >
        {/* Question */}
        <TableCell className="align-top whitespace-normal break-words">
          <div className="font-medium text-foreground leading-relaxed">
            {item.question}
          </div>
        </TableCell>

        {/* Answer */}
        <TableCell className="align-top whitespace-normal break-words">
          <div className="text-muted-foreground leading-relaxed">
            {item.answer}
          </div>
        </TableCell>

        {/* Weight */}
        <TableCell className="align-top whitespace-nowrap">
          <span className="font-semibold text-primary">
            {item.weight}%
          </span>
        </TableCell>

        {/* AI Feedback */}
        <TableCell className="align-top whitespace-normal break-words">
          <div className="text-muted-foreground leading-relaxed">
            {item.feedback}
          </div>
        </TableCell>
      </TableRow>
    )
  )}
</TableBody>
  </Table>
</div>


              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


