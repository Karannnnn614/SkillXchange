"use client"

import { Search, MapPin, Star, TrendingUp, Award, Clock, Filter, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap } from "lucide-react"
import { useAppContext } from "@/contexts/app-context"

export function HomePage() {
  const {
    searchQuery,
    setSearchQuery,
    availabilityFilter,
    setAvailabilityFilter,
    skillFilter,
    setSkillFilter,
    filteredUsers,
    isLoggedIn,
    setCurrentScreen,
    setSelectedUser,
  } = useAppContext()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Skills</h2>
            <p className="text-gray-600">Find your perfect learning partner with AI-powered matching</p>
          </div>

          <div className="mt-4 lg:mt-0">
            <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Smart Matching Active:</strong> Results are ranked by compatibility score
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search skills, users, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger>
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>

          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Skill Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="language">Languages</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {user.location}
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{user.rating}/5</span>
                      <span className="text-xs text-gray-400 ml-2">({user.completedSwaps} swaps)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{user.matchScore}% match</span>
                  </div>
                  <Progress value={user.matchScore} className="w-16 h-2" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {user.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{user.bio}</p>

                <div>
                  <p className="text-sm font-medium text-green-600 mb-2">Skills Offered:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill} className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-600 mb-2">Skills Wanted:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs border-blue-300 text-blue-600">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Available: {user.availability}</span>
                  <span>{user.isOnline ? "Online now" : `Last seen ${user.lastSeen}`}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    onClick={() => {
                      if (!isLoggedIn) {
                        setCurrentScreen("login")
                      } else {
                        setSelectedUser(user)
                        setCurrentScreen("swap-request")
                      }
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Request Swap
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!isLoggedIn) {
                        setCurrentScreen("login")
                      } else {
                        setCurrentScreen("messages")
                      }
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {"<"}
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
          <Button variant="outline" size="sm">
            {">"}
          </Button>
        </div>
      </div>
    </div>
  )
}
