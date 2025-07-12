"use client"

import { ArrowRight, Clock, Users, Star, Target, CheckCircle, Filter, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/contexts/app-context"
import { mockRoadmaps } from "@/lib/mock-data"

export function RoadmapsPage() {
  const {
    selectedRoadmap,
    setSelectedRoadmap,
    userRoadmapProgress,
    setUserRoadmapProgress,
    roadmapFilter,
    setRoadmapFilter,
  } = useAppContext()

  const filteredRoadmaps = mockRoadmaps.filter((roadmap) => {
    if (roadmapFilter === "all") return true
    if (roadmapFilter === "my-roadmaps") {
      return userRoadmapProgress.some((progress) => progress.roadmapId === roadmap.id)
    }
    return roadmap.category.toLowerCase() === roadmapFilter.toLowerCase()
  })

  const startRoadmap = (roadmap: any) => {
    const newProgress = {
      roadmapId: roadmap.id,
      startedAt: new Date().toISOString().split("T")[0],
      currentMilestone: 0,
      completedMilestones: [],
      totalProgress: 0,
      estimatedCompletion: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }
    setUserRoadmapProgress((prev) => [...prev, newProgress])
  }

  const getUserProgress = (roadmapId: string) => {
    return userRoadmapProgress.find((progress) => progress.roadmapId === roadmapId)
  }

  if (selectedRoadmap) {
    const userProgress = getUserProgress(selectedRoadmap.id)

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setSelectedRoadmap(null)} className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Roadmaps
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{selectedRoadmap.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedRoadmap.title}</h1>
                  <p className="text-gray-600 mt-2">{selectedRoadmap.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium">{selectedRoadmap.estimatedTime}</div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="text-sm font-medium">{selectedRoadmap.learners.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Learners</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-sm font-medium">{selectedRoadmap.rating}/5</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-medium">{selectedRoadmap.milestones.length}</div>
                    <div className="text-xs text-gray-500">Milestones</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="lg:w-80">
              <CardContent className="p-6">
                {userProgress ? (
                  <div>
                    <h3 className="font-semibold mb-4">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>{userProgress.totalProgress}%</span>
                        </div>
                        <Progress value={userProgress.totalProgress} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>Started: {userProgress.startedAt}</div>
                        <div>Est. Completion: {userProgress.estimatedCompletion}</div>
                      </div>
                      <Button className="w-full">Continue Learning</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold mb-4">Start Your Journey</h3>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        <div>• {selectedRoadmap.milestones.length} milestones to complete</div>
                        <div>• Estimated {selectedRoadmap.estimatedTime}</div>
                        <div>• {selectedRoadmap.skills.length} skills to master</div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        onClick={() => startRoadmap(selectedRoadmap)}
                      >
                        Start Roadmap
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {selectedRoadmap.prerequisites.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRoadmap.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="outline" className="border-orange-300 text-orange-600">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Skills You'll Master</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRoadmap.skills.map((skill) => (
                <Badge key={skill} className="bg-blue-100 text-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-6">Learning Path</h3>
          <div className="space-y-6">
            {selectedRoadmap.milestones.map((milestone, index) => (
              <Card key={milestone.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        milestone.isCompleted
                          ? "bg-green-500 text-white"
                          : userProgress && index === userProgress.currentMilestone
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {milestone.isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{milestone.title}</h4>
                        <Badge variant="outline">{milestone.estimatedHours}h</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{milestone.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium mb-2">Skills</h5>
                          <div className="flex flex-wrap gap-1">
                            {milestone.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Resources</h5>
                          <div className="space-y-1">
                            {milestone.resources.slice(0, 3).map((resource) => (
                              <div key={resource.id} className="text-sm text-gray-600 flex items-center">
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    resource.isCompleted ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                />
                                {resource.title}
                              </div>
                            ))}
                            {milestone.resources.length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{milestone.resources.length - 3} more resources
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {userProgress && index === userProgress.currentMilestone && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Milestone
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skill Roadmaps</h2>
        <p className="text-lg text-gray-600">
          Follow structured learning paths to master new skills with guidance from the community.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="category-filter">Filter by Category</Label>
            <Select value={roadmapFilter} onValueChange={setRoadmapFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="my-roadmaps">My Roadmaps</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {userRoadmapProgress.length > 0 && roadmapFilter !== "my-roadmaps" && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Your Active Roadmaps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRoadmapProgress.map((progress) => {
              const roadmap = mockRoadmaps.find((r) => r.id === progress.roadmapId)
              if (!roadmap) return null

              return (
                <Card key={progress.roadmapId} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6" onClick={() => setSelectedRoadmap(roadmap)}>
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{roadmap.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold">{roadmap.title}</h4>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">In Progress</Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{progress.totalProgress}%</span>
                        </div>
                        <Progress value={progress.totalProgress} className="h-2" />
                      </div>

                      <div className="text-sm text-gray-600">
                        <div>
                          Milestone {progress.currentMilestone + 1} of {roadmap.milestones.length}
                        </div>
                        <div>Est. completion: {progress.estimatedCompletion}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Separator className="my-8" />
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-6">
          {roadmapFilter === "my-roadmaps" ? "Your Roadmaps" : "Explore Roadmaps"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => {
            const userProgress = getUserProgress(roadmap.id)

            return (
              <Card key={roadmap.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => setSelectedRoadmap(roadmap)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{roadmap.icon}</span>
                      <div>
                        <h4 className="font-semibold">{roadmap.title}</h4>
                        <p className="text-sm text-gray-600">{roadmap.category}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        roadmap.difficulty === "advanced"
                          ? "bg-red-100 text-red-800"
                          : roadmap.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {roadmap.difficulty}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{roadmap.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{roadmap.estimatedTime}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{roadmap.learners.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{roadmap.rating}/5</span>
                      </div>
                      <span className="text-gray-500">{roadmap.milestones.length} milestones</span>
                    </div>

                    {userProgress && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Your Progress</span>
                          <span className="text-blue-600">{userProgress.totalProgress}%</span>
                        </div>
                        <Progress value={userProgress.totalProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {roadmap.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {roadmap.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{roadmap.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-8">Why Follow Roadmaps?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Structured Learning</h4>
            <p className="text-gray-600 text-sm">Follow proven paths designed by experts</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Track Progress</h4>
            <p className="text-gray-600 text-sm">Monitor your advancement and stay motivated</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Community Support</h4>
            <p className="text-gray-600 text-sm">Learn alongside thousands of other students</p>
          </div>
        </div>
      </div>
    </div>
  )
}
