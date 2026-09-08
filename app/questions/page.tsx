"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, GripVertical } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import { DashboardLayout } from "../../components/dashboard-layout"


// ===============================
// TYPES
// ===============================

interface Question {
  id: string
  question: string
  category: string
  weight: number
}

interface NewQuestion {
  question: string
  category: string
  weight: number
}


// ===============================
// CATEGORIES
// ===============================

const categories = [
  "Technical",
  "Behavioral",
  "Process",
  "Growth",
  "Leadership",
]


// ===============================
// CATEGORY COLORS
// ===============================

function getCategoryColor(category: string) {
  switch (category) {
    case "Technical":
      return "bg-blue-500/10 text-blue-500"

    case "Behavioral":
      return "bg-purple-500/10 text-purple-500"

    case "Process":
      return "bg-yellow-500/10 text-yellow-500"

    case "Growth":
      return "bg-green-500/10 text-green-500"

    case "Leadership":
      return "bg-orange-500/10 text-orange-500"

    default:
      return "bg-muted text-muted-foreground"
  }
}


// ===============================
// PAGE
// ===============================

export default function QuestionsPage() {

  const [questions, setQuestions] = useState<Question[]>([])

  const [searchQuery, setSearchQuery] = useState("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [editingQuestion, setEditingQuestion] =
    useState<Question | null>(null)

  const [newQuestion, setNewQuestion] =
    useState<NewQuestion>({
      question: "",
      category: "",
      weight: 10,
    })


  // ===============================
  // API URL
  // ===============================

  const API_URL = import.meta.env.VITE_API_URL


  // ===============================
  // LOAD QUESTIONS
  // ===============================

  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const response = await fetch(
          `${API_URL}/questions`
        )

        if (!response.ok) {
          throw new Error("Failed to load questions")
        }

        const data = await response.json()

        console.log(
          "Questions from MongoDB:",
          data
        )

        const backendQuestions =
          data.questions.map((question: any) => ({
            id: question._id,
            question: question.question,
            category: question.category,
            weight: question.weight,
          }))

        setQuestions(backendQuestions)

      } catch (error) {

        console.error(
          "Failed to load questions:",
          error
        )

      }

    }

    loadQuestions()

  }, [API_URL])


  // ===============================
  // SEARCH
  // ===============================

  const filteredQuestions = questions.filter(
    (q) =>
      q.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      q.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )


  // ===============================
  // TOTAL WEIGHT
  // ===============================

  const totalWeight = questions.reduce(
    (sum, q) => sum + q.weight,
    0
  )


  // ===============================
  // ADD / UPDATE QUESTION
  // ===============================

  const handleSave = async () => {

    if (
      !newQuestion.question.trim() ||
      !newQuestion.category
    ) {
      return
    }

    try {

      // ===============================
      // UPDATE
      // ===============================

      if (editingQuestion) {

        const response = await fetch(
          `${API_URL}/questions/${editingQuestion.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              question: newQuestion.question,
              category: newQuestion.category,
              weight: newQuestion.weight,
            }),
          }
        )


        if (!response.ok) {
          throw new Error(
            "Failed to update question"
          )
        }


        const data = await response.json()

        const updatedQuestion =
          data.question


        setQuestions((prev) =>
          prev.map((q) =>
            q.id === editingQuestion.id
              ? {
                  id: updatedQuestion._id,
                  question:
                    updatedQuestion.question,
                  category:
                    updatedQuestion.category,
                  weight:
                    updatedQuestion.weight,
                }
              : q
          )
        )


        console.log(
          "Question updated:",
          updatedQuestion
        )

      }

      // ===============================
      // CREATE
      // ===============================

      else {

        const response = await fetch(
          `${API_URL}/questions`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              question: newQuestion.question,
              category: newQuestion.category,
              weight: newQuestion.weight,
            }),
          }
        )


        if (!response.ok) {
          throw new Error(
            "Failed to create question"
          )
        }


        const data = await response.json()

        const createdQuestion =
          data.question


        setQuestions((prev) => [
          ...prev,

          {
            id: createdQuestion._id,
            question:
              createdQuestion.question,
            category:
              createdQuestion.category,
            weight:
              createdQuestion.weight,
          },
        ])


        console.log(
          "Question created:",
          createdQuestion
        )

      }


      // ===============================
      // RESET
      // ===============================

      setIsDialogOpen(false)

      setEditingQuestion(null)

      setNewQuestion({
        question: "",
        category: "",
        weight: 10,
      })


    } catch (error) {

      console.error(
        "Failed to save question:",
        error
      )

    }

  }


  // ===============================
  // EDIT QUESTION
  // ===============================

  const handleEdit = (
    question: Question
  ) => {

    setEditingQuestion(question)

    setNewQuestion({
      question: question.question,
      category: question.category,
      weight: question.weight,
    })

    setIsDialogOpen(true)
  }


  // ===============================
  // DELETE QUESTION
  // ===============================

  const handleDelete = async (
    id: string
  ) => {

    try {

      console.log(
        "Deleting question:",
        id
      )


      const response = await fetch(
        `${API_URL}/questions/${id}`,
        {
          method: "DELETE",
        }
      )


      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          "Delete API error:",
          errorText
        )

        throw new Error(
          "Failed to delete question"
        )
      }


      // Remove from UI
      setQuestions((prev) =>
        prev.filter(
          (q) => q.id !== id
        )
      )


      console.log(
        "Question deleted successfully:",
        id
      )


    } catch (error) {

      console.error(
        "Failed to delete question:",
        error
      )

    }

  }


  // ===============================
  // OPEN ADD QUESTION
  // ===============================

  const handleOpenAdd = () => {

    setEditingQuestion(null)

    setNewQuestion({
      question: "",
      category: "",
      weight: 10,
    })

    setIsDialogOpen(true)
  }


  // ===============================
  // UI
  // ===============================

  return (

    <DashboardLayout>

      <div className="space-y-6">


        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold text-foreground">
              Question Bank
            </h1>

            <p className="text-muted-foreground">
              Manage evaluation questions and their weights
            </p>

          </div>


          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >

            <DialogTrigger asChild>

              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleOpenAdd}
              >

                <Plus className="h-4 w-4 mr-2" />

                Add Question

              </Button>

            </DialogTrigger>


            {/* ================= DIALOG ================= */}

            <DialogContent className="bg-card border-border">

              <DialogHeader>

                <DialogTitle className="text-foreground">

                  {editingQuestion
                    ? "Edit Question"
                    : "Add New Question"}

                </DialogTitle>


                <DialogDescription className="text-muted-foreground">

                  {editingQuestion
                    ? "Update the question details below"
                    : "Create a new evaluation question for candidates"}

                </DialogDescription>

              </DialogHeader>


              <div className="space-y-4 py-4">


                {/* QUESTION */}

                <div className="space-y-2">

                  <Label
                    htmlFor="question"
                    className="text-foreground"
                  >
                    Question
                  </Label>


                  <Textarea
                    id="question"
                    placeholder="Enter your question..."
                    value={newQuestion.question}

                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }

                    className="bg-secondary border-0"
                  />

                </div>


                {/* CATEGORY + WEIGHT */}

                <div className="grid grid-cols-2 gap-4">


                  {/* CATEGORY */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="category"
                      className="text-foreground"
                    >
                      Category
                    </Label>


                    <Select
                      value={newQuestion.category}

                      onValueChange={(value) =>
                        setNewQuestion({
                          ...newQuestion,
                          category: value,
                        })
                      }
                    >

                      <SelectTrigger className="bg-secondary border-0">

                        <SelectValue
                          placeholder="Select category"
                        />

                      </SelectTrigger>


                      <SelectContent>

                        {categories.map(
                          (cat) => (

                            <SelectItem
                              key={cat}
                              value={cat}
                            >
                              {cat}
                            </SelectItem>

                          )
                        )}

                      </SelectContent>

                    </Select>

                  </div>


                  {/* WEIGHT */}

                  <div className="space-y-2">

                    <Label
                      htmlFor="weight"
                      className="text-foreground"
                    >
                      Weight (%)
                    </Label>


                    <Input
                      id="weight"
                      type="number"
                      min="1"
                      max="100"

                      value={
                        newQuestion.weight
                      }

                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,

                          weight:
                            parseInt(
                              e.target.value
                            ) || 0,
                        })
                      }

                      className="bg-secondary border-0"
                    />

                  </div>

                </div>

              </div>


              {/* ================= FOOTER ================= */}

              <DialogFooter>

                <Button
                  variant="outline"
                  onClick={() =>
                    setIsDialogOpen(false)
                  }
                >
                  Cancel
                </Button>


                <Button
                  onClick={handleSave}

                  disabled={
                    !newQuestion.question ||
                    !newQuestion.category
                  }

                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >

                  {editingQuestion
                    ? "Update"
                    : "Add"}{" "}
                  Question

                </Button>

              </DialogFooter>

            </DialogContent>

          </Dialog>

        </div>


        {/* ================= STATS ================= */}

        <div className="grid gap-4 md:grid-cols-3">


          {/* TOTAL QUESTIONS */}

          <Card className="bg-card border-border">

            <CardContent className="pt-6">

              <div className="text-2xl font-bold text-foreground">
                {questions.length}
              </div>

              <p className="text-sm text-muted-foreground">
                Total Questions
              </p>

            </CardContent>

          </Card>


          {/* CATEGORIES */}

          <Card className="bg-card border-border">

            <CardContent className="pt-6">

              <div className="text-2xl font-bold text-foreground">
                {categories.length}
              </div>

              <p className="text-sm text-muted-foreground">
                Categories
              </p>

            </CardContent>

          </Card>


          {/* WEIGHT */}

          <Card className="bg-card border-border">

            <CardContent className="pt-6">

              <div
                className={`text-2xl font-bold ${
                  totalWeight === 100
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {totalWeight}%
              </div>

              <p className="text-sm text-muted-foreground">
                Total Weight
              </p>

            </CardContent>

          </Card>

        </div>


        {/* ================= QUESTIONS ================= */}

        <Card className="bg-card border-border">

          <CardHeader>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <CardTitle className="text-foreground">
                All Questions
              </CardTitle>


              <div className="relative">

                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />


                <Input
                  placeholder="Search questions..."

                  value={searchQuery}

                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }

                  className="pl-9 w-full sm:w-64 bg-secondary border-0"
                />

              </div>

            </div>

          </CardHeader>


          <CardContent>

            <div className="space-y-3">


              {filteredQuestions.length === 0 ? (

                <p className="text-center text-muted-foreground py-8">
                  No questions found.
                </p>

              ) : (

                filteredQuestions.map(
                  (question) => (

                    <div
                      key={question.id}

                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                    >


                      <GripVertical
                        className="h-5 w-5 text-muted-foreground cursor-grab"
                      />


                      <div className="flex-1 min-w-0">

                        <p className="text-foreground font-medium">
                          {question.question}
                        </p>


                        <div className="flex items-center gap-2 mt-2">

                          <Badge
                            className={`${getCategoryColor(
                              question.category
                            )} border-0`}
                          >
                            {question.category}
                          </Badge>


                          <span className="text-xs text-muted-foreground">
                            Weight: {question.weight}%
                          </span>

                        </div>

                      </div>


                      {/* ================= ACTIONS ================= */}

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">


                        {/* EDIT */}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"

                          onClick={() =>
                            handleEdit(question)
                          }
                        >

                          <Edit className="h-4 w-4" />

                        </Button>


                        {/* DELETE */}

                        <Button
                          variant="ghost"
                          size="icon"

                          className="h-8 w-8 text-red-500 hover:text-red-500"

                          onClick={() =>
                            handleDelete(
                              question.id
                            )
                          }
                        >

                          <Trash2 className="h-4 w-4" />

                        </Button>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </CardContent>

        </Card>

      </div>

    </DashboardLayout>

  )
}
