"use client"

import { Star, Send, Video, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppContext } from "@/contexts/app-context"

export function SwapRequestPage() {
  const { selectedUser, currentUser, setCurrentScreen } = useAppContext()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Swap Request</h2>
        <p className="text-gray-600">Propose a skill exchange with {selectedUser?.name}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedUser?.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {selectedUser?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedUser?.name}</h3>
                <p className="text-sm text-gray-600">{selectedUser?.location}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">{selectedUser?.rating}/5</span>
                  <Badge className="ml-2 bg-green-100 text-green-700 text-xs">{selectedUser?.matchScore}% match</Badge>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">I can teach them:</Label>
              <p className="text-sm text-gray-600 mb-3">
                Choose a skill from your offerings that matches their interests
              </p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill you can teach" />
                </SelectTrigger>
                <SelectContent>
                  {currentUser.skillsOffered
                    .filter((skill) => selectedUser?.skillsWanted.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill} ✨ (Perfect match!)
                      </SelectItem>
                    ))}
                  {currentUser.skillsOffered
                    .filter((skill) => !selectedUser?.skillsWanted.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">I want to learn:</Label>
              <p className="text-sm text-gray-600 mb-3">Choose a skill they offer that you want to learn</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill you want to learn" />
                </SelectTrigger>
                <SelectContent>
                  {selectedUser?.skillsOffered
                    .filter((skill) => currentUser.skillsWanted.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill} ✨ (Perfect match!)
                      </SelectItem>
                    ))}
                  {selectedUser?.skillsOffered
                    .filter((skill) => !currentUser.skillsWanted.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Personal Message</Label>
              <p className="text-sm text-gray-600 mb-3">Introduce yourself and explain your learning goals</p>
              <Textarea
                id="message"
                placeholder="Hi! I'm excited about the possibility of exchanging skills with you. I have experience in... and I'm looking to learn... because..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label className="text-base font-medium">Preferred Learning Format</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <Card className="p-4 cursor-pointer hover:bg-blue-50 border-2 border-transparent hover:border-blue-200">
                  <div className="text-center">
                    <Video className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium">Video Calls</p>
                    <p className="text-sm text-gray-600">Real-time sessions</p>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:bg-green-50 border-2 border-transparent hover:border-green-200">
                  <div className="text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Messaging</p>
                    <p className="text-sm text-gray-600">Async learning</p>
                  </div>
                </Card>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Smart Tip:</strong> This user has a high compatibility score with you! They're likely to accept
                your request.
              </AlertDescription>
            </Alert>

            <div className="flex space-x-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Send className="h-4 w-4 mr-2" />
                Send Request
              </Button>
              <Button variant="outline" onClick={() => setCurrentScreen("home")}>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
