"use client"

import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Star,
  Upload,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"

import { useState, useEffect } from "react"

import ResumeUpload from "../../components/ui/upload_btn"

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)

  /*
  ============================================================
  FETCH CANDIDATE ANALYSIS
  ============================================================
  */

  useEffect(() => {
    const loadCandidate = async () => {
      const params = new URLSearchParams(window.location.search)

      const candidateId = params.get("id")

      if (!candidateId) {
        console.error("No candidate ID found in URL")
        return
      }

      const API_URL = import.meta.env.VITE_API_URL

      console.log("API URL:", API_URL)
      console.log("Fetching candidate:", candidateId)

      try {
        const response = await fetch(
          `${API_URL}/candidates/${candidateId}`
        )

        console.log(
          "Candidate API status:",
          response.status
        )

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          )
        }

        const data = await response.json()

        console.log("Candidate data:", data)

        setAnalysisData(data)
      } catch (error) {
        console.error(
          "Failed to fetch candidate:",
          error
        )
      }
    }

    loadCandidate()
  }, [])

  /*
  ============================================================
  LOADING STATE
  ============================================================
  */

  if (!analysisData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-semibold">
            Loading analysis...
          </div>

          <p className="text-sm text-muted-foreground">
            Please wait while we load the candidate analysis.
          </p>
        </div>
      </div>
    )
  }

  /*
  ============================================================
  ANALYSIS DATA
  ============================================================
  */

  const report = analysisData?.analysis_report

  const score = report?.overall_score ?? 0

  // Shortlist threshold = 65
  const isShortlisted = score >= 65

  const candidate = report?.candidate ?? {}

  const recommendation =
    report?.recommendation ?? {}

  const strengths =
    report?.strengths ?? []

  const weaknesses =
    report?.weaknesses ?? []

  const scoreBreakdown =
    report?.score_breakdown ?? []

  const questions =
    report?.questions ?? []

  /*
  ============================================================
  UI
  ============================================================
  */

  return (
    <div className="space-y-6">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Resume Analysis
          </h1>

          <p className="text-muted-foreground">
            AI-powered candidate resume evaluation
          </p>
        </div>

        <div className="flex gap-2">

          {isShortlisted ? (
            <Button className="bg-green-600 text-white hover:bg-green-700">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Shortlisted
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Rejected
            </Button>
          )}

        </div>
      </div>


      {/* ================================================== */}
      {/* CANDIDATE PROFILE */}
      {/* ================================================== */}

      <Card>

        <CardHeader>
          <CardTitle>
            Candidate Profile
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div>
              <p className="text-sm text-muted-foreground">
                Name
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.name || "Not available"}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Role
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.role || "Not available"}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.email || "Not available"}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.phone || "Not available"}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Experience
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.experience || "Not available"}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Location
              </p>

              <p className="mt-1 font-semibold">
                {candidate?.location || "Not available"}
              </p>
            </div>

          </div>

        </CardContent>
      </Card>


      {/* ================================================== */}
      {/* MAIN SCORE */}
      {/* ================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* SCORE CARD */}

        <Card>

          <CardHeader>
            <CardTitle>
              Resume Score
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="flex flex-col items-center justify-center">

              <div className="relative flex h-40 w-40 items-center justify-center">

                <svg
                  className="h-40 w-40 -rotate-90"
                  viewBox="0 0 100 100"
                >

                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${score}, 100`}
                    pathLength="100"
                    strokeLinecap="round"
                    className={
                      score >= 65
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  />

                </svg>

                <div className="absolute text-center">

                  <div className="text-4xl font-bold">
                    {score}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    / 100
                  </div>

                </div>

              </div>


              <div className="mt-4">

                {isShortlisted ? (
                  <Badge className="bg-green-600">
                    Shortlisted
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Rejected
                  </Badge>
                )}

              </div>

            </div>

          </CardContent>

        </Card>


        {/* RECOMMENDATION */}

        <Card className="lg:col-span-2">

          <CardHeader>
            <CardTitle>
              AI Recommendation
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                {isShortlisted ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}

                <div>

                  <p className="font-semibold">
                    {recommendation?.status ||
                      (isShortlisted
                        ? "Shortlisted"
                        : "Rejected")}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Based on the overall resume evaluation
                  </p>

                </div>

              </div>


              <div>

                <h3 className="mb-2 font-semibold">
                  Summary
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  {recommendation?.summary ||
                    "No recommendation summary available."}
                </p>

              </div>


              <div>

                <h3 className="mb-2 font-semibold">
                  Key Insight
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  {recommendation?.key_insight ||
                    "No key insight available."}
                </p>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>


      {/* ================================================== */}
      {/* TABS */}
      {/* ================================================== */}

      <Tabs defaultValue="overview" className="w-full">

        <TabsList className="grid w-full grid-cols-3">

          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>

          <TabsTrigger value="questions">
            Question Evaluation
          </TabsTrigger>

          <TabsTrigger value="candidate">
            Candidate Details
          </TabsTrigger>

        </TabsList>


        {/* ================================================== */}
        {/* OVERVIEW */}
        {/* ================================================== */}

        <TabsContent
          value="overview"
          className="space-y-6"
        >

          {/* SCORE BREAKDOWN */}

          <Card>

            <CardHeader>
              <CardTitle>
                Score Breakdown
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="space-y-5">

                {scoreBreakdown.length > 0 ? (

                  scoreBreakdown.map(
                    (item: any, index: number) => (

                      <div key={index}>

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-sm font-medium">
                            {item?.category ||
                              item?.name ||
                              `Category ${index + 1}`}
                          </span>

                          <span className="text-sm font-semibold">
                            {item?.score ?? 0}%
                          </span>

                        </div>

                        <Progress
                          value={item?.score ?? 0}
                          className="h-2"
                        />

                      </div>

                    )
                  )

                ) : (

                  <p className="text-sm text-muted-foreground">
                    No score breakdown available.
                  </p>

                )}

              </div>

            </CardContent>

          </Card>


          {/* STRENGTHS + WEAKNESSES */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* STRENGTHS */}

            <Card>

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <CheckCircle className="h-5 w-5 text-green-500" />

                  Strengths

                </CardTitle>

              </CardHeader>

              <CardContent>

                {strengths.length > 0 ? (

                  <div className="space-y-3">

                    {strengths.map(
                      (strength: any, index: number) => (

                        <div
                          key={index}
                          className="flex gap-3"
                        >

                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />

                          <p className="text-sm leading-6">
                            {typeof strength === "string"
                              ? strength
                              : strength?.text ||
                                strength?.description ||
                                JSON.stringify(strength)}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-sm text-muted-foreground">
                    No strengths identified.
                  </p>

                )}

              </CardContent>

            </Card>


            {/* WEAKNESSES */}

            <Card>

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <AlertCircle className="h-5 w-5 text-red-500" />

                  Weaknesses

                </CardTitle>

              </CardHeader>

              <CardContent>

                {weaknesses.length > 0 ? (

                  <div className="space-y-3">

                    {weaknesses.map(
                      (weakness: any, index: number) => (

                        <div
                          key={index}
                          className="flex gap-3"
                        >

                          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                          <p className="text-sm leading-6">
                            {typeof weakness === "string"
                              ? weakness
                              : weakness?.text ||
                                weakness?.description ||
                                JSON.stringify(weakness)}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-sm text-muted-foreground">
                    No weaknesses identified.
                  </p>

                )}

              </CardContent>

            </Card>

          </div>

        </TabsContent>


        {/* ================================================== */}
        {/* QUESTION EVALUATION */}
        {/* ================================================== */}

        <TabsContent
          value="questions"
          className="space-y-6"
        >

          <Card>

            <CardHeader>

              <CardTitle>
                Resume Evaluation Questions
              </CardTitle>

            </CardHeader>

            <CardContent>

              {questions.length > 0 ? (

                <div className="space-y-6">

                  {questions.map(
                    (item: any, index: number) => (

                      <div
                        key={index}
                        className="rounded-lg border p-5"
                      >

                        {/* QUESTION HEADER */}

                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                          <div className="flex gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                              {index + 1}
                            </div>

                            <div>

                              <h3 className="font-semibold leading-6">
                                {item?.question ||
                                  "Question not available"}
                              </h3>

                            </div>

                          </div>


                          <div className="flex items-center gap-2">

                            {item?.weight !== undefined && (

                              <Badge variant="outline">
                                Weight: {item.weight}%
                              </Badge>

                            )}

                            <Badge
                              className={
                                (item?.score ?? 0) >= 65
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }
                            >
                              {item?.score ?? 0}/100
                            </Badge>

                          </div>

                        </div>


                        {/* ANSWER */}

                        <div className="mt-5">

                          <h4 className="mb-2 text-sm font-semibold">
                            Answer from Resume
                          </h4>

                          <div className="rounded-md bg-muted/50 p-4">

                            <p className="text-sm leading-6">
                              {item?.answer ||
                                "Information not available in the resume."}
                            </p>

                          </div>

                        </div>


                        {/* PROGRESS */}

                        <div className="mt-5">

                          <div className="mb-2 flex justify-between text-sm">

                            <span className="text-muted-foreground">
                              Score
                            </span>

                            <span className="font-semibold">
                              {item?.score ?? 0}%
                            </span>

                          </div>

                          <Progress
                            value={item?.score ?? 0}
                            className="h-2"
                          />

                        </div>


                        {/* AI FEEDBACK */}

                        <div className="mt-5">

                          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">

                            <Star className="h-4 w-4" />

                            AI Feedback

                          </h4>

                          <p className="text-sm leading-6 text-muted-foreground">
                            {item?.feedback ||
                              "No AI feedback available."}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="py-10 text-center">

                  <AlertCircle className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                  <p className="font-medium">
                    No evaluation questions found
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    The analysis does not contain any question evaluations.
                  </p>

                </div>

              )}

            </CardContent>

          </Card>

        </TabsContent>


        {/* ================================================== */}
        {/* CANDIDATE DETAILS */}
        {/* ================================================== */}

        <TabsContent
          value="candidate"
          className="space-y-6"
        >

          <Card>

            <CardHeader>

              <CardTitle>
                Candidate Information
              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="grid gap-6 md:grid-cols-2">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.name ||
                      "Information not available"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Role
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.role ||
                      "Information not available"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.email ||
                      "Information not available"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.phone ||
                      "Information not available"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Experience
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.experience ||
                      "Information not available"}
                  </p>

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    {candidate?.location ||
                      "Information not available"}
                  </p>

                </div>


                <div className="md:col-span-2">

                  <p className="text-sm text-muted-foreground">
                    LinkedIn
                  </p>

                  <p className="mt-1 font-medium">

                    {candidate?.linkedIn ? (

                      <a
                        href={candidate.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.linkedIn}
                      </a>

                    ) : (

                      "Information not available"

                    )}

                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        </TabsContent>

      </Tabs>


      {/* ================================================== */}
      {/* UPLOAD ANOTHER RESUME */}
      {/* ================================================== */}

      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">

            <Upload className="h-5 w-5" />

            Analyze Another Resume

          </CardTitle>

        </CardHeader>

        <CardContent>

          <ResumeUpload
            onUploadSuccess={(data) => {
              console.log("Parsed:", data)
              setAnalysisData(data)
            }}
          />

        </CardContent>

      </Card>

    </div>
  )
}
