'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Menu,
  X,
  Users,
  Award,
  BookOpen,
  MessageCircle,
  Target,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppContext } from '@/contexts/app-context';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentScreen,
    setCurrentScreen,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    mobileMenuOpen,
    setMobileMenuOpen,
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    unreadNotifications,
    conversations,
  } = useAppContext();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SkillXchange
            </Link>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link href="/discover">
              <Button
                variant="ghost"
                className={`px-4 ${pathname === '/discover' ? 'bg-gray-100' : ''}`}
              >
                <Users className="h-4 w-4 mr-2" />
                Discover
              </Button>
            </Link>
            {/* <Button variant="ghost" onClick={() => setCurrentScreen("skills-assessment")}>
              <Award className="h-4 w-4 mr-2" />
              Skills Test
            </Button> */}
            <Link href="/requests">
              <Button
                variant="ghost"
                className={`px-4 ${pathname === '/requests' ? 'bg-gray-100' : ''}`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Requests
              </Button>
            </Link>
            <Link href="/messages">
              <Button
                variant="ghost"
                className={`px-4 ${pathname === '/messages' ? 'bg-gray-100' : ''}`}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
                {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0) > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/roadmaps">
              <Button
                variant="ghost"
                className={`px-4 ${pathname === '/roadmaps' ? 'bg-gray-100' : ''}`}
              >
                <Target className="h-4 w-4 mr-2" />
                Roadmaps
              </Button>
            </Link>
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
                              !notification.isRead ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => {
                              setNotifications((prev) =>
                                prev.map((n) =>
                                  n.id === notification.id ? { ...n, isRead: true } : n
                                )
                              );
                              if (notification.type === 'message') {
                                setCurrentScreen('messages');
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === 'request'
                                    ? 'bg-blue-500'
                                    : notification.type === 'match'
                                    ? 'bg-green-500'
                                    : notification.type === 'message'
                                    ? 'bg-purple-500'
                                    : 'bg-gray-500'
                                }`}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-gray-600">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.timestamp}
                                </p>
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
                    <AvatarImage src={currentUser.avatar || '/placeholder.svg'} />
                    <AvatarFallback>YN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrentScreen('profile')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      console.log('Logout clicked');
                      setIsLoggedIn(false);
                      setCurrentUser({
                        id: 'current',
                        name: 'Your Name',
                        email: 'you@example.com',
                        role: 'user',
                        location: 'Your Location',
                        avatar: '/placeholder.svg?height=60&width=60',
                        skillsOffered: ['Graphic Design', 'Video Editing'],
                        skillsWanted: ['Python', 'JavaScript'],
                        rating: 4.5,
                        availability: 'weekends',
                        isPublic: true,
                        isOnline: true,
                        lastSeen: 'now',
                        bio: 'Creative professional looking to expand into tech',
                        completedSwaps: 12,
                        joinedDate: '2023-06-01',
                        badges: ['New Member'],
                        isVerified: false,
                        level: 'beginner',
                      });
                      router.push('/auth');
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => router.push('/auth')}>Login</Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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
                router.push('/discover');
                setMobileMenuOpen(false);
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Discover
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                router.push('/skills');
                setMobileMenuOpen(false);
              }}
            >
              <Award className="h-4 w-4 mr-2" />
              Skills Test
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                router.push('/requests');
                setMobileMenuOpen(false);
              }}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Requests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                router.push('/messages');
                setMobileMenuOpen(false);
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                router.push('/roadmaps');
                setMobileMenuOpen(false);
              }}
            >
              <Target className="h-4 w-4 mr-2" />
              Roadmaps
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
