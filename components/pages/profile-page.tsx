"use client"

import { Settings, Star, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppContext } from "@/contexts/app-context"

export function ProfilePage() {
  const { currentUser } = useAppContext()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-lg">{currentUser.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{currentUser.location}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{currentUser.rating}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completed Swaps</span>
                <span className="font-medium">{currentUser.completedSwaps}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">June 2023</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1 justify-center">
              {currentUser.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={currentUser.name} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={currentUser.location} className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={currentUser.bio}
                    className="mt-1"
                    placeholder="Tell others about yourself and your learning goals..."
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select defaultValue={currentUser.availability}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="mornings">Mornings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6 mt-6">
                <div>
                  <Label className="text-base font-medium">Skills I Can Teach</Label>
                  <p className="text-sm text-gray-600 mb-3">Add skills you're confident teaching to others</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentUser.skillsOffered.map((skill) => (
                      <Badge key={skill} className="bg-green-100 text-green-800">
                        {skill}
                        <button className="ml-2 text-green-600 hover:text-green-800">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Add a skill..." />
                    <Button variant="outline" className="text-green-600 border-green-300 bg-transparent">
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Skills I Want to Learn</Label>
                  <p className="text-sm text-gray-600 mb-3">Add skills you'd like to learn from others</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentUser.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-blue-300 text-blue-600">
                        {skill}
                        <button className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Add a skill..." />
                    <Button variant="outline" className="text-blue-600 border-blue-300 bg-transparent">
                      Add
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                    </div>
                    <Switch defaultChecked={currentUser.isPublic} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Online Status</Label>
                      <p className="text-sm text-gray-600">Let others see when you're online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Smart Matching</Label>
                      <p className="text-sm text-gray-600">Use AI to find better matches</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-4 pt-6 border-t">
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
