import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, Star, TrendingUp } from "lucide-react"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "14",
      description: "Active platform members",
      icon: Users,
    },
    {
      title: "Admin Users",
      value: "2",
      description: "Platform administrators",
      icon: Shield,
    },
    {
      title: "Expert Users",
      value: "4",
      description: "Subject matter experts",
      icon: Star,
    },
    {
      title: "New This Month",
      value: "3",
      description: "Recently joined users",
      icon: TrendingUp,
    },
  ]

  const recentUsers = [
    { name: "Tom Wilson", email: "tom.wilson@email.com", role: "user", level: "beginner", joined: "2024-01-20" },
    { name: "Maria Gonzalez", email: "maria.gonzalez@email.com", role: "user", level: "beginner", joined: "2024-02-05" },
    { name: "David Chang", email: "david.chang@email.com", role: "user", level: "beginner", joined: "2024-03-01" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage the SkillXchange platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Recent New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.level === 'expert' ? 'default' : 'secondary'}>
                    {user.level}
                  </Badge>
                  <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
                    {user.role}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {user.joined}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Test User Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Admin Access:</p>
              <p className="text-sm text-gray-600">Email: admin@skillxchange.com | Password: admin123</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Expert User:</p>
              <p className="text-sm text-gray-600">Email: emily.watson@email.com | Password: user123</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Regular User:</p>
              <p className="text-sm text-gray-600">Email: jamie.park@email.com | Password: user123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
