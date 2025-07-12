"use client"

import { MessageCircle, Phone, Video, MoreVertical, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/contexts/app-context"

export function MessagesPage() {
  const { conversations, selectedConversation, setSelectedConversation, messageInput, setMessageInput } =
    useAppContext()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Messages
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <CardContent className="p-0">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{conversation.userName}</p>
                        <p className="text-xs text-gray-500">{conversation.lastMessageTime}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs">{conversation.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Marc Demo</p>
                      <p className="text-sm text-green-600">Online now</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="h-[calc(100vh-400px)] p-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Hi! I saw your profile and I'm interested in learning JavaScript. I can teach you Graphic Design
                        in return!
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        That sounds perfect! I've been wanting to improve my design skills. When would you like to
                        start?
                      </p>
                      <p className="text-xs text-blue-100 mt-1">2:32 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Great! Let's schedule our first session for this weekend. I can show you some design principles
                        and you can help me with React basics.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2:35 PM</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setMessageInput("")
                      }
                    }}
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
