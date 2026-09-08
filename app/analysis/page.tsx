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

  const [analysisData, setAnalysisData] = useState<any>(null)


  // =========================================================
  // GET SCORE
  // =========================================================

  const score =
    analysisData?.analysis_report?.overall_score ?? 0


  // =========================================================
  // SHORTLIST / REJECT
  // 65 OR ABOVE = SHORTLISTED
  // BELOW 65 = REJECTED
  // =========================================================

  const isShortlisted = score >= 65


  // =========================================================
  // FETCH EXISTING CANDIDATE ANALYSIS
  // =========================================================

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    )

    const candidateId = params.get("id")


    // If there is no candidate ID,
    // this is probably a fresh resume upload.
    if (!candidateId) {
      console.log("No candidate ID found - fresh upload")
      return
    }


    console.log(
      "Fetching candidate:",
      candidateId
    )


    const API_URL = import.meta.env.VITE_API_URL


    fetch(
      `${API_URL}/candidates/${candidateId}`
    )

      .then((res) => {

        if (!res.ok) {

          throw new Error(
            `HTTP error: ${res.status}`
          )

        }

        return res.json()

      })

      .then((data) => {

        console.log(
          "Candidate data:",
          data
        )

        setAnalysisData(data)

      })

      .catch((err) => {

        console.error(
          "Failed to fetch candidate:",
          err
        )

      })

  }, [])


  return (

    <DashboardLayout>

      <div className="space-y-6">


        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div>

          <h1 className="text-3xl font-bold">
            Resume Analysis
          </h1>

          <p className="text-muted-foreground mt-1">
            Analyze candidate resume and evaluate
            their suitability for the role.
          </p>

        </div>


        {/* =====================================================
            RESUME UPLOAD
        ===================================================== */}

        <Card>

          <CardHeader>

            <CardTitle>
              Upload Resume
            </CardTitle>

          </CardHeader>


          <CardContent>

            <ResumeUpload

              onUploadSuccess={(data) => {

                console.log(
                  "Parsed:",
                  data
                )

                setAnalysisData(data)

              }}

            />

          </CardContent>

        </Card>


        {/* =====================================================
            SHOW ANALYSIS ONLY AFTER DATA EXISTS
        ===================================================== */}

        {analysisData && (

          <>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid gap-4 md:grid-cols-3">


              {/* OVERALL SCORE */}

              <Card>

                <CardHeader
                  className="flex flex-row items-center justify-between space-y-0 pb-2"
                >

                  <CardTitle className="text-sm font-medium">
                    Overall Score
                  </CardTitle>

                  <Star className="h-5 w-5 text-yellow-500" />

                </CardHeader>


                <CardContent>

                  <div className="text-3xl font-bold">

                    {score}

                    <span className="text-lg text-muted-foreground">
                      /100
                    </span>

                  </div>


                  <Progress
                    value={score}
                    className="mt-3"
                  />


                  <p className="text-xs text-muted-foreground mt-2">

                    Candidate evaluation score

                  </p>

                </CardContent>

              </Card>



              {/* STATUS */}

              <Card>

                <CardHeader
                  className="flex flex-row items-center justify-between space-y-0 pb-2"
                >

                  <CardTitle className="text-sm font-medium">
                    Recommendation
                  </CardTitle>


                  {isShortlisted ? (

                    <CheckCircle className="h-5 w-5 text-green-600" />

                  ) : (

                    <XCircle className="h-5 w-5 text-red-600" />

                  )}

                </CardHeader>


                <CardContent>

                  <div className="text-2xl font-bold">

                    {isShortlisted
                      ? "Shortlisted"
                      : "Rejected"}

                  </div>


                  <p className="text-xs text-muted-foreground mt-2">

                    {isShortlisted
                      ? "Candidate meets the required score."
                      : "Candidate is below the required score."}

                  </p>

                </CardContent>

              </Card>



              {/* CANDIDATE */}

              <Card>

                <CardHeader
                  className="flex flex-row items-center justify-between space-y-0 pb-2"
                >

                  <CardTitle className="text-sm font-medium">
                    Candidate
                  </CardTitle>

                  <AlertCircle className="h-5 w-5 text-muted-foreground" />

                </CardHeader>


                <CardContent>

                  <div className="text-xl font-bold">

                    {
                      analysisData?.analysis_report
                        ?.candidate?.name ||
                      analysisData?.candidate?.name ||
                      "Unknown Candidate"
                    }

                  </div>


                  <p className="text-xs text-muted-foreground mt-2">

                    {
                      analysisData?.analysis_report
                        ?.candidate?.role ||
                      analysisData?.candidate?.role ||
                      "Role not available"
                    }

                  </p>

                </CardContent>

              </Card>


            </div>



            {/* =================================================
                CANDIDATE INFORMATION
            ================================================= */}

            <Card>

              <CardHeader>

                <CardTitle>
                  Candidate Information
                </CardTitle>

              </CardHeader>


              <CardContent>

                <div className="grid gap-4 md:grid-cols-2">


                  <div>

                    <p className="text-sm text-muted-foreground">
                      Name
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.name ||
                        analysisData?.candidate?.name ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.email ||
                        analysisData?.candidate?.email ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Phone
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.phone ||
                        analysisData?.candidate?.phone ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Role
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.role ||
                        analysisData?.candidate?.role ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Experience
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.experience ||
                        analysisData?.candidate?.experience ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Location
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.location ||
                        analysisData?.candidate?.location ||
                        "Not available"
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      LinkedIn
                    </p>

                    <p className="font-medium">

                      {
                        analysisData?.analysis_report
                          ?.candidate?.linkedIn ||
                        analysisData?.candidate?.linkedIn ||
                        "Not available"
                      }

                    </p>

                  </div>


                </div>

              </CardContent>

            </Card>



            {/* =================================================
                SHORTLIST / REJECT BUTTON
            ================================================= */}

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



            {/* =================================================
                TABS
            ================================================= */}

            <Tabs
              defaultValue="strengths"
              className="w-full"
            >

              <TabsList className="grid w-full grid-cols-3">

                <TabsTrigger value="strengths">
                  Strengths
                </TabsTrigger>

                <TabsTrigger value="weaknesses">
                  Weaknesses
                </TabsTrigger>

                <TabsTrigger value="evaluation">
                  Evaluation
                </TabsTrigger>

              </TabsList>



              {/* =================================================
                  STRENGTHS
              ================================================= */}

              <TabsContent value="strengths">

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Candidate Strengths
                    </CardTitle>

                  </CardHeader>


                  <CardContent>

                    <ul className="space-y-3">

                      {(
                        analysisData?.analysis_report
                          ?.strengths || []
                      ).map(
                        (
                          strength: string,
                          index: number
                        ) => (

                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >

                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />

                            <span>
                              {strength}
                            </span>

                          </li>

                        )
                      )}

                    </ul>

                  </CardContent>

                </Card>

              </TabsContent>



              {/* =================================================
                  WEAKNESSES
              ================================================= */}

              <TabsContent value="weaknesses">

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Candidate Weaknesses
                    </CardTitle>

                  </CardHeader>


                  <CardContent>

                    <ul className="space-y-3">

                      {(
                        analysisData?.analysis_report
                          ?.weaknesses || []
                      ).map(
                        (
                          weakness: string,
                          index: number
                        ) => (

                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >

                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />

                            <span>
                              {weakness}
                            </span>

                          </li>

                        )
                      )}

                    </ul>

                  </CardContent>

                </Card>

              </TabsContent>



              {/* =================================================
                  EVALUATION
              ================================================= */}

              <TabsContent value="evaluation">

                <Card>

                  <CardHeader>

                    <CardTitle>
                      Evaluation Questions
                    </CardTitle>

                  </CardHeader>


                  <CardContent>

                    <div className="rounded-md border">

                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead>
                              Question
                            </TableHead>

                            <TableHead>
                              Answer
                            </TableHead>

                            <TableHead>
                              Weight
                            </TableHead>

                            <TableHead>
                              AI Feedback
                            </TableHead>

                          </TableRow>

                        </TableHeader>


                        <TableBody>

                          {(
                            analysisData?.analysis_report
                              ?.questions || []
                          ).map(
                            (
                              item: any,
                              index: number
                            ) => (

                              <TableRow
                                key={index}
                              >

                                <TableCell className="font-medium">

                                  {item.question}

                                </TableCell>


                                <TableCell>

                                  {item.answer}

                                </TableCell>


                                <TableCell>

                                  <Badge variant="outline">

                                    {item.weight ?? 0}%

                                  </Badge>

                                </TableCell>


                                <TableCell>

                                  {item.feedback}

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



            {/* =================================================
                RECOMMENDATION
            ================================================= */}

            <Card>

              <CardHeader>

                <CardTitle>
                  AI Recommendation
                </CardTitle>

              </CardHeader>


              <CardContent>

                <div className="space-y-4">


                  <div>

                    <p className="text-sm text-muted-foreground">
                      Status
                    </p>

                    <Badge
                      className={
                        isShortlisted
                          ? "bg-green-600"
                          : "bg-red-600"
                      }
                    >

                      {isShortlisted
                        ? "Shortlisted"
                        : "Rejected"}

                    </Badge>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Summary
                    </p>

                    <p className="mt-1">

                      {
                        analysisData?.analysis_report
                          ?.recommendation?.summary ||
                        "No summary available."
                      }

                    </p>

                  </div>



                  <div>

                    <p className="text-sm text-muted-foreground">
                      Key Insight
                    </p>

                    <p className="mt-1">

                      {
                        analysisData?.analysis_report
                          ?.recommendation?.key_insight ||
                        "No key insight available."
                      }

                    </p>

                  </div>


                </div>

              </CardContent>

            </Card>


          </>

        )}

      </div>

    </DashboardLayout>

  )
}
