"use client"

import { Bell, Menu, X, Users, Award, BookOpen, MessageCircle, Target, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/contexts/app-context"

export function Header() {
  const {
    currentScreen,
    setCurrentScreen,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    mobileMenuOpen,
    setMobileMenuOpen,
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    unreadNotifications,
    conversations,
  } = useAppContext()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setCurrentScreen(isLoggedIn ? "home" : "landing")}
            >
              SkillXchange
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Button variant="ghost" onClick={() => setCurrentScreen("home")}>
              <Users className="h-4 w-4 mr-2" />
              Discover
            </Button>
            <Button variant="ghost" onClick={() => setCurrentScreen("skills-assessment")}>
              <Award className="h-4 w-4 mr-2" />
              Skills Test
            </Button>
            <Button variant="ghost" onClick={() => setCurrentScreen("requests")}>
              <BookOpen className="h-4 w-4 mr-2" />
              Requests
            </Button>
            <Button variant="ghost" onClick={() => setCurrentScreen("messages")}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
              {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0) > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs">
                  {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" onClick={() => setCurrentScreen("roadmaps")}>
              <Target className="h-4 w-4 mr-2" />
              Roadmaps
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>

                {showNotifications && (
                  <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden z-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Notifications</CardTitle>
                    </CardHeader>
                    <ScrollArea className="h-80">
                      <CardContent className="p-0">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.isRead ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              setNotifications((prev) =>
                                prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
                              )
                              if (notification.type === "message") {
                                setCurrentScreen("messages")
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === "request"
                                    ? "bg-blue-500"
                                    : notification.type === "match"
                                      ? "bg-green-500"
                                      : notification.type === "message"
                                        ? "bg-purple-500"
                                        : "bg-gray-500"
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-gray-600">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </ScrollArea>
                  </Card>
                )}
              </div>
            )}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>YN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrentScreen("profile")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsLoggedIn(false)
                      setCurrentScreen("landing")
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setCurrentScreen("login")}>Login</Button>
            )}

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCurrentScreen("home")
                setMobileMenuOpen(false)
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Discover
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCurrentScreen("skills-assessment")
                setMobileMenuOpen(false)
              }}
            >
              <Award className="h-4 w-4 mr-2" />
              Skills Test
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCurrentScreen("requests")
                setMobileMenuOpen(false)
              }}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Requests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCurrentScreen("messages")
                setMobileMenuOpen(false)
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCurrentScreen("roadmaps")
                setMobileMenuOpen(false)
              }}
            >
              <Target className="h-4 w-4 mr-2" />
              Roadmaps
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
