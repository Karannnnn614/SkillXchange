"use client"

import { useEffect } from "react"
import { Clock, BookOpen, Target, Award, CheckCircle, ArrowRight, TrendingUp, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppContext } from "@/contexts/app-context"
import { mockAssessments } from "@/lib/mock-data"

export function SkillsAssessmentPage() {
  const {
    currentAssessment,
    setCurrentAssessment,
    assessmentAnswers,
    setAssessmentAnswers,
    assessmentResults,
    setAssessmentResults,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    assessmentTimeLeft,
    setAssessmentTimeLeft,
    showAssessmentResults,
    setShowAssessmentResults,
    setCurrentScreen,
  } = useAppContext()

  const startAssessment = (assessment: any) => {
    setCurrentAssessment(assessment)
    setAssessmentAnswers({})
    setCurrentQuestionIndex(0)
    setAssessmentTimeLeft(assessment.duration * 60)
    setShowAssessmentResults(false)
  }

  const submitAnswer = (questionId: string, answerIndex: number) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const finishAssessment = () => {
    if (!currentAssessment) return

    let totalScore = 0
    let maxScore = 0

    currentAssessment.questions.forEach((question) => {
      maxScore += question.points
      const userAnswer = assessmentAnswers[question.id]
      if (userAnswer === question.correctAnswer) {
        totalScore += question.points
      }
    })

    const percentage = Math.round((totalScore / maxScore) * 100)
    let level: "beginner" | "intermediate" | "advanced" | "expert" = "beginner"

    if (percentage >= 90) level = "expert"
    else if (percentage >= 80) level = "advanced"
    else if (percentage >= 70) level = "intermediate"

    const result = {
      skillName: currentAssessment.skillName,
      score: percentage,
      level,
      completedAt: new Date().toLocaleDateString(),
      certificateId: percentage >= currentAssessment.passingScore ? `CERT-${Date.now()}` : undefined,
    }

    setAssessmentResults((prev) => [...prev, result])
    setShowAssessmentResults(true)
  }

  const nextQuestion = () => {
    if (currentAssessment && currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      finishAssessment()
    }
  }

  useEffect(() => {
    if (assessmentTimeLeft > 0 && currentAssessment && !showAssessmentResults) {
      const timer = setTimeout(() => {
        setAssessmentTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (assessmentTimeLeft === 0 && currentAssessment) {
      finishAssessment()
    }
  }, [assessmentTimeLeft, currentAssessment, showAssessmentResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showAssessmentResults && currentAssessment) {
    const result = assessmentResults[assessmentResults.length - 1]
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              {result.score >= currentAssessment.passingScore ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
              <p className="text-gray-600">Here are your results for {currentAssessment.skillName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{result.score}%</div>
                  <p className="text-gray-600">Your Score</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2 capitalize">{result.level}</div>
                  <p className="text-gray-600">Skill Level</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {result.certificateId ? "Certified" : "Practice More"}
                  </div>
                  <p className="text-gray-600">Status</p>
                </CardContent>
              </Card>
            </div>

            {result.certificateId && (
              <Alert className="bg-green-50 border-green-200 mb-6">
                <Award className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Congratulations!</strong> You've earned a certificate for {currentAssessment.skillName}.
                  Certificate ID: {result.certificateId}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-4 justify-center">
              <Button
                onClick={() => {
                  setCurrentAssessment(null)
                  setShowAssessmentResults(false)
                }}
              >
                Take Another Assessment
              </Button>
              <Button variant="outline" onClick={() => setCurrentScreen("profile")}>
                Update Profile
              </Button>
              <Button variant="outline" onClick={() => setCurrentScreen("home")}>
                Find Learning Partners
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentAssessment) {
    const currentQuestion = currentAssessment.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{currentAssessment.skillName} Assessment</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                <span className={`font-mono ${assessmentTimeLeft < 300 ? "text-red-500" : "text-gray-600"}`}>
                  {formatTime(assessmentTimeLeft)}
                </span>
              </div>
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

              {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        assessmentAnswers[currentQuestion.id] === index
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => submitAnswer(currentQuestion.id, index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              assessmentAnswers[currentQuestion.id] === index
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {assessmentAnswers[currentQuestion.id] === index && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <span className="text-gray-700">{option}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentAssessment(null)
                  setShowAssessmentResults(false)
                }}
              >
                Exit Assessment
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={assessmentAnswers[currentQuestion.id] === undefined}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestionIndex === currentAssessment.questions.length - 1 ? "Finish" : "Next Question"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills Assessment Center</h2>
        <p className="text-lg text-gray-600">
          Validate your skills, earn certificates, and showcase your expertise to potential learning partners.
        </p>
      </div>

      {assessmentResults.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Your Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentResults.map((result, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">{result.skillName}</h4>
                    <Badge
                      className={`${
                        result.level === "expert"
                          ? "bg-purple-100 text-purple-800"
                          : result.level === "advanced"
                            ? "bg-blue-100 text-blue-800"
                            : result.level === "intermediate"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {result.level}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-medium">{result.score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium">{result.completedAt}</span>
                    </div>
                    {result.certificateId && (
                      <div className="mt-3 p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-green-800">Certified</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-6">Available Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{assessment.skillName}</h4>
                    <Badge
                      className={`${
                        assessment.difficulty === "advanced"
                          ? "bg-red-100 text-red-800"
                          : assessment.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Test your knowledge and earn a certificate in {assessment.skillName}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{assessment.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{assessment.questions.length} questions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>{assessment.passingScore}% to pass</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => startAssessment(assessment)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-8">Why Take Skills Assessments?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Earn Certificates</h4>
            <p className="text-gray-600 text-sm">Get verified certificates to showcase your skills</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Better Matches</h4>
            <p className="text-gray-600 text-sm">Verified skills lead to higher quality exchanges</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Build Trust</h4>
            <p className="text-gray-600 text-sm">Demonstrate your expertise to the community</p>
          </div>
        </div>
      </div>
    </div>
  )
}
