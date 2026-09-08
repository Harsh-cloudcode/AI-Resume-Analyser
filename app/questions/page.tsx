// import React, { useState, useMemo } from 'react'
// import { Plus, Search, GripVertical, Edit, Trash2 } from 'lucide-react'
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Textarea } from "../../components/ui/textarea"
// import { Label } from "../../components/ui/label"
// import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select"

// // 1. Interfaces for proper TypeScript definitions
// interface Question {
//   id: string
//   question: string
//   category: string
//   weight: number
// }

// // Global layout component placeholder mock wrapper - replace with your actual import path
// function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return <div className="p-6 max-w-7xl mx-auto">{children}</div>
// }

// export default function QuestionBank() {
//   // 2. Primary States
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
//   const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
//   const [searchQuery, setSearchQuery] = useState<string>("")
  
//   const [categories] = useState<string[]>(["Technical", "Behavioral", "Culture", "Logic"])
  
//   const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
//     question: "",
//     category: "",
//     weight: 10
//   })

//   const [questions, setQuestions] = useState<Question[]>([
//     { id: '1', question: "Explain how React lifecycle methods work in functional components.", category: "Technical", weight: 40 },
//     { id: '2', question: "How do you handle disagreement with your team lead on design choices?", category: "Behavioral", weight: 30 },
//     { id: '3', question: "What values do you look for most in an engineering workspace culture?", category: "Culture", weight: 30 }
//   ])

//   // 3. Derived Computations via useMemo Hooks
//   const totalWeight = useMemo(() => {
//     return questions.reduce((sum, item) => sum + item.weight, 0)
//   }, [questions])

//   const filteredQuestions = useMemo(() => {
//     return questions.filter((q) =>
//       q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       q.category.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }, [questions, searchQuery])

//   // Helper utility mapping for Badge colors
//   const getCategoryColor = (cat: string) => {
//     switch (cat) {
//       case 'Technical': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
//       case 'Behavioral': return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
//       case 'Culture': return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
//       default: return 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20'
//     }
//   }

//   // 4. Action Handlers
//   const handleOpenAddModal = () => {
//     setEditingQuestion(null)
//     setNewQuestion({ question: "", category: "", weight: 10 })
//     setIsDialogOpen(true)
//   }

//   const handleEdit = (question: Question) => {
//     setEditingQuestion(question)
//     setNewQuestion({
//       question: question.question,
//       category: question.category,
//       weight: question.weight
//     })
//     setIsDialogOpen(true)
//   }

//   const handleDelete = (id: string) => {
//     setQuestions((prev) => prev.filter((q) => q.id !== id))
//   }

//   const handleSave = () => {
//     if (!newQuestion.question.trim() || !newQuestion.category) return

//     if (editingQuestion) {
//       // Logic for editing an existing item
//       setQuestions((prev) =>
//         prev.map((q) =>
//           q.id === editingQuestion.id
//             ? { ...q, question: newQuestion.question, category: newQuestion.category, weight: newQuestion.weight }
//             : q
//         )
//       )
//     } else {
//       // Logic for appending a brand new item
//       const createdItem: Question = {
//         id: crypto.randomUUID(),
//         question: newQuestion.question,
//         category: newQuestion.category,
//         weight: newQuestion.weight
//       }
//       setQuestions((prev) => [...prev, createdItem])
//     }

//     setIsDialogOpen(false)
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
//             <p className="text-muted-foreground">Manage evaluation questions and their weights</p>
//           </div>
          
//           {/* Action Trigger Dialog Modal Control */}
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <Button
//               className="bg-primary text-primary-foreground hover:bg-primary/90"
//               onClick={handleOpenAddModal}
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add Question
//             </Button>
            
//             <DialogContent className="bg-card border-border">
//               <DialogHeader>
//                 <DialogTitle className="text-foreground">
//                   {editingQuestion ? "Edit Question" : "Add New Question"}
//                 </DialogTitle>
//                 <DialogDescription className="text-muted-foreground">
//                   {editingQuestion
//                     ? "Update the question details below"
//                     : "Create a new evaluation question for candidates"}
//                 </DialogDescription>
//               </DialogHeader>
              
//               <div className="space-y-4 py-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="question" className="text-foreground">
//                     Question
//                   </Label>
//                   <Textarea
//                     id="question"
//                     placeholder="Enter your question..."
//                     value={newQuestion.question}
//                     onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
//                     className="bg-secondary border-0"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="category" className="text-foreground">
//                       Category
//                     </Label>
//                     {/* Fixed: Added pass-through logic for selected category mapping state strings */}
//                     <Select
//                       value={newQuestion.category}
//                       onValueChange={(val) => setNewQuestion({ ...newQuestion, })}
//                     >
//                       <SelectTrigger className="bg-secondary border-0 text-left">
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories.map((cat) => (
//                           <SelectItem key={cat} value={cat}>
//                             {cat}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="weight" className="text-foreground">
//                       Weight (%)
//                     </Label>
//                     <Input
//                       id="weight"
//                       type="number"
//                       min="1"
//                       max="100"
//                       value={newQuestion.weight}
//                       onChange={(e) =>
//                         setNewQuestion({ ...newQuestion, weight: parseInt(e.target.value) || 0 })
//                       }
//                       className="bg-secondary border-0"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSave}
//                   disabled={!newQuestion.question || !newQuestion.category}
//                   className="bg-primary text-primary-foreground hover:bg-primary/90"
//                 >
//                   {editingQuestion ? "Update" : "Add"} Question
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Aggregate Stats Cards Counter Display Grid Layouts */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card className="bg-card border-border">
//             <CardContent className="pt-6">
//               <div className="text-2xl font-bold text-foreground">{questions.length}</div>
//               <p className="text-sm text-muted-foreground">Total Questions</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-card border-border">
//             <CardContent className="pt-6">
//               <div className="text-2xl font-bold text-foreground">{categories.length}</div>
//               <p className="text-sm text-muted-foreground">Categories</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-card border-border">
//             <CardContent className="pt-6">
//               <div className={`text-2xl font-bold ${totalWeight === 100 ? "text-green-500" : "text-amber-500"}`}>
//                 {totalWeight}%
//               </div>
//               <p className="text-sm text-muted-foreground">Total Weight</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Dynamic Display Questions List Grid */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


//               </div>
            
//           </CardHeader>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }



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

const initialQuestions = [
  {
    id: "1",
    question: "Describe a challenging technical problem you solved",
    category: "Technical",
    weight: 25,
  },
  {
    id: "2",
    question: "How do you handle conflicting priorities?",
    category: "Behavioral",
    weight: 20,
  },
  {
    id: "3",
    question: "What is your experience with agile methodologies?",
    category: "Process",
    weight: 15,
  },
  {
    id: "4",
    question: "How do you stay updated with technology trends?",
    category: "Growth",
    weight: 10,
  },
  {
    id: "5",
    question: "Describe your experience leading a team",
    category: "Leadership",
    weight: 15,
  },
  {
    id: "6",
    question: "How do you approach code reviews?",
    category: "Technical",
    weight: 15,
  },
]












function getCategoryColor(category: string) {
  switch (category) {
    case "Technical":
      return "bg-chart-1/20 text-chart-1"
    case "Behavioral":
      return "bg-chart-2/20 text-chart-2"
    case "Process":
      return "bg-chart-3/20 text-chart-3"
    case "Growth":
      return "bg-chart-4/20 text-chart-4"
    case "Leadership":
      return "bg-chart-5/20 text-chart-5"
    default:
      return "bg-muted text-muted-foreground"
  }
}


const categories = ["Technical", "Behavioral", "Process", "Growth", "Leadership"]
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


export default function QuestionsPage() {
  // const [questions, setQuestions] = useState(initialQuestions)
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
  
  useEffect(() => {
  const loadQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8000/questions")

      if (!response.ok) {
        throw new Error("Failed to load questions")
      }

      const data = await response.json()

      console.log("Questions from MongoDB:", data)

      const backendQuestions = data.questions.map((question: any) => ({
        id: question._id,
        question: question.question,
        category: question.category,
        weight: question.weight,
      }))

      setQuestions(backendQuestions)
    } catch (error) {
      console.error("Failed to load questions:", error)
    }
  }

  loadQuestions()
}, [])

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0)


 
   

  
  const handleSave = async () => {
  if (!newQuestion.question.trim() || !newQuestion.category) {
    return
  }

  try {
    if (editingQuestion) {
      // UPDATE EXISTING QUESTION
      const response = await fetch(
        `http://localhost:8000/questions/${editingQuestion.id}`,
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
        throw new Error("Failed to update question")
      }

      const data = await response.json()
      const updatedQuestion = data.question

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id
            ? {
                id: updatedQuestion._id,
                question: updatedQuestion.question,
                category: updatedQuestion.category,
                weight: updatedQuestion.weight,
              }
            : q
        )
      )

      console.log("Question updated:", updatedQuestion)
    } else {
      // CREATE NEW QUESTION
      const response = await fetch(
        "http://localhost:8000/questions",
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
        throw new Error("Failed to create question")
      }

      const data = await response.json()
      const createdQuestion = data.question

      setQuestions((prev) => [
        ...prev,
        {
          id: createdQuestion._id,
          question: createdQuestion.question,
          category: createdQuestion.category,
          weight: createdQuestion.weight,
        },
      ])

      console.log("Question created:", createdQuestion)
    }

    // CLOSE DIALOG AND RESET FORM
    setIsDialogOpen(false)
    setEditingQuestion(null)
    setNewQuestion({
      question: "",
      category: "",
      weight: 10,
    })
  } catch (error) {
    console.error("Failed to save question:", error)
  }
}
  const handleEdit = (question: Question) => {
  setEditingQuestion(question)

  setNewQuestion({
    question: question.question,
    category: question.category,
    weight: question.weight,
  })

  setIsDialogOpen(true)
}

  const handleDelete = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/questions/${id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to delete question")
    }

    setQuestions((prev) =>
      prev.filter((q) => q.id !== id)
    )

    console.log("Question deleted:", id)

  } catch (error) {
    console.error("Failed to delete question:", error)
  }
}

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
            <p className="text-muted-foreground">Manage evaluation questions and their weights</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger >
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setEditingQuestion(null)
                  setNewQuestion({ question: "", category: "", weight: 10 })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {editingQuestion
                    ? "Update the question details below"
                    : "Create a new evaluation question for candidates"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question" className="text-foreground">
                    Question
                  </Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your question..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="bg-secondary border-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground">
                      Category
                    </Label>
                    <Select
  value={newQuestion.category}
  onValueChange={(value) =>
  setNewQuestion({
    ...newQuestion,
    category: value ?? "",
  })
}
>
                      <SelectTrigger className="bg-secondary border-0">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-foreground">
                      Weight (%)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      min="1"
                      max="100"
                      value={newQuestion.weight}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, weight: parseInt(e.target.value) || 0 })
                      }
                      className="bg-secondary border-0"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!newQuestion.question || !newQuestion.category}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {editingQuestion ? "Update" : "Add"} Question
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{questions.length}</div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${totalWeight === 100 ? "text-success" : "text-warning"}`}>
                {totalWeight}%
              </div>
              <p className="text-sm text-muted-foreground">Total Weight</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-foreground">All Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 bg-secondary border-0"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium">{question.question}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getCategoryColor(question.category)} border-0`}>
                        {question.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Weight: {question.weight}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(question)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
