"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Search, Send, Plus, Users, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export interface UserProps {
  id?: string
  name?: string
  email?: string
}

const User = ({ user }: { user: UserProps[] }) => {
  const { theme, setTheme } = useTheme()

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className=" mx-auto p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="bg-gray-800 border-gray-700 shadow-lg"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Send Money</h1>
            <p className="text-sm text-gray-400">Choose a contact to send money</p>
          </div>
        </div>
        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search contacts..."
          className="pl-10 h-12 text-base bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-800 border-gray-700">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-sm font-medium text-white">Send to Phone</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-800 border-gray-700">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-sm font-medium text-white">Send to UPI ID</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-800 border-gray-700">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-900/30 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-sm font-medium text-white">Bank Transfer</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-800 border-gray-700">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
              <Plus className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-white">More Options</p>
          </div>
        </Card>
      </div>

      {/* Recent Contacts Header */}
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-lg font-semibold text-white">Recent Contacts</h2>
        <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
          {user.length} contacts
        </Badge>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {user.map((u: UserProps) => (
          <Card
            key={u.id}
            className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01] bg-gray-800 border-gray-700"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {getInitials(u.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{u.name || "Unknown User"}</h3>
                    <p className="text-sm text-gray-400 truncate">{u.email || "No email provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {user.length === 0 && (
        <Card className="p-12 bg-gray-800 border-gray-700">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">No contacts found</h3>
              <p className="text-gray-400">Add contacts to start sending money</p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Your First Contact
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default User
