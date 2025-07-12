"use client"

import { Star, TrendingUp, CheckCircle, MessageCircle, Video, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RequestsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Swap Requests</h2>
        <p className="text-gray-600">Manage your incoming and outgoing skill exchange requests</p>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incoming">
            Incoming
            <Badge className="ml-2 bg-blue-500 text-white">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-6 mt-6">
          {/* Pending Request */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Sarah Chen</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Wants to exchange: <span className="font-medium text-blue-600">Graphic Design</span> for your{" "}
                      <span className="font-medium text-green-600">JavaScript</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>4.9/5</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span>92% match</span>
                      </div>
                      <span>2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded-lg">
                      "Hi! I'm a UX designer with 5+ years of experience. I'd love to help you with design principles
                      and Figma in exchange for learning React and modern JavaScript. I'm available weekends and
                      evenings!"
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                    Decline
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Another Pending Request */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Alex Rodriguez</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Wants to exchange: <span className="font-medium text-blue-600">Python & Data Science</span> for
                      your <span className="font-medium text-green-600">Video Editing</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>4.7/5</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span>88% match</span>
                      </div>
                      <span>1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded-lg">
                      "I'm a data scientist looking to get into content creation. I can teach you Python, machine
                      learning, and data analysis in exchange for video editing skills using Adobe Premiere or DaVinci
                      Resolve."
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                    Decline
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-6 mt-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Marc Demo</h3>
                      <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      You offered: <span className="font-medium text-green-600">Graphic Design</span> for their{" "}
                      <span className="font-medium text-blue-600">JavaScript</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>4.8/5</span>
                      </div>
                      <span>Accepted 3 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Continue Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6 mt-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">Jane Wilson</h3>
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Exchanged: <span className="font-medium text-green-600">Graphic Design</span> ↔{" "}
                      <span className="font-medium text-blue-600">Photography</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>5.0/5</span>
                      </div>
                      <span>Completed 2 weeks ago</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      ✅ "Amazing experience! Jane taught me advanced photography techniques and I helped her with logo
                      design. Highly recommend!"
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Leave Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Success
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
            {">"}
          </Button>
        </div>
      </div>
    </div>
  )
}
