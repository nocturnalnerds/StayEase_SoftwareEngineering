"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Settings,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "staff" | "customer";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
  department?: string;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  permissions: string[];
}

// Simple StatusBadge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

// Simple StatsCard component
const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">{trend} from last month</p>
      </CardContent>
    </Card>
  );
};

const UserManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [viewStaffOpen, setViewStaffOpen] = useState(false);
  const [editStaffOpen, setEditStaffOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "John Admin",
      email: "john.admin@hotel.com",
      phone: "+1234567890",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-01-01T00:00:00Z",
      department: "IT",
    },
    {
      id: "2",
      name: "Jane Manager",
      email: "jane.manager@hotel.com",
      phone: "+1234567891",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      createdAt: "2023-02-15T00:00:00Z",
      department: "Operations",
    },
    {
      id: "3",
      name: "Bob Staff",
      email: "bob.staff@hotel.com",
      phone: "+1234567892",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      createdAt: "2023-06-01T00:00:00Z",
      department: "Front Office",
    },
  ];

  const staff: Staff[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@hotel.com",
      phone: "+1234567893",
      position: "Front Desk Manager",
      department: "Front Office",
      salary: 45000,
      hireDate: "2023-03-15",
      status: "active",
      permissions: ["check-in", "check-out", "reservations"],
    },
    {
      id: "2",
      name: "Charlie Brown",
      email: "charlie.brown@hotel.com",
      phone: "+1234567894",
      position: "Housekeeping Supervisor",
      department: "Housekeeping",
      salary: 38000,
      hireDate: "2023-05-20",
      status: "active",
      permissions: ["room-status", "maintenance"],
    },
    {
      id: "3",
      name: "Diana Prince",
      email: "diana.prince@hotel.com",
      phone: "+1234567895",
      position: "Restaurant Manager",
      department: "Food & Beverage",
      salary: 50000,
      hireDate: "2023-01-10",
      status: "on-leave",
      permissions: ["restaurant", "inventory", "orders"],
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "156",
      icon: Users,
      trend: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Active Staff",
      value: "42",
      icon: Shield,
      trend: "+3%",
      color: "bg-green-500",
    },
    {
      title: "Administrators",
      value: "8",
      icon: ShieldCheck,
      trend: "0%",
      color: "bg-purple-500",
    },
    {
      title: "New This Month",
      value: "15",
      icon: UserPlus,
      trend: "+25%",
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewUserOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleViewStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setViewStaffOpen(true);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setEditStaffOpen(true);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading User Management Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">
              User Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage users, staff, and permissions efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New User
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="userName"
                      className="text-[#213555] font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="userName"
                      placeholder="Enter full name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="userEmail"
                      className="text-[#213555] font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="Enter email"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="userPhone"
                      className="text-[#213555] font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="userPhone"
                      placeholder="Enter phone number"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="userRole"
                      className="text-[#213555] font-medium"
                    >
                      Role
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="userDepartment"
                      className="text-[#213555] font-medium"
                    >
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="front-office">
                          Front Office
                        </SelectItem>
                        <SelectItem value="housekeeping">
                          Housekeeping
                        </SelectItem>
                        <SelectItem value="food-beverage">
                          Food & Beverage
                        </SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddUserOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Add User
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddUserOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New Staff Member
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="staffName"
                      className="text-[#213555] font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="staffName"
                      placeholder="Enter full name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="staffEmail"
                      className="text-[#213555] font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="staffEmail"
                      type="email"
                      placeholder="Enter email"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="staffPhone"
                      className="text-[#213555] font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="staffPhone"
                      placeholder="Enter phone number"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="staffPosition"
                      className="text-[#213555] font-medium"
                    >
                      Position
                    </Label>
                    <Input
                      id="staffPosition"
                      placeholder="Enter position"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="staffDepartment"
                      className="text-[#213555] font-medium"
                    >
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="front-office">
                          Front Office
                        </SelectItem>
                        <SelectItem value="housekeeping">
                          Housekeeping
                        </SelectItem>
                        <SelectItem value="food-beverage">
                          Food & Beverage
                        </SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="staffSalary"
                      className="text-[#213555] font-medium"
                    >
                      Salary
                    </Label>
                    <Input
                      id="staffSalary"
                      type="number"
                      placeholder="Enter salary"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddStaffOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Add Staff
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddStaffOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                User & Staff Management
              </CardTitle>
              <div className="flex space-x-4">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 border-b">
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  System Users ({users.length})
                </TabsTrigger>
                <TabsTrigger
                  value="staff"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Staff Members ({staff.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Role
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Department
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Last Login
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user.id}
                          className="hover:bg-purple-50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#4F709C]">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin"
                                  ? "destructive"
                                  : user.role === "manager"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {user.department || "-"}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={user.status} />
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewUser(user)}
                                className="hover:bg-purple-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                className="hover:bg-purple-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="staff" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Position
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Department
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Salary
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Hire Date
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staff.map((staffMember) => (
                        <TableRow
                          key={staffMember.id}
                          className="hover:bg-purple-50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#4F709C]">
                                {staffMember.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {staffMember.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {staffMember.position}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {staffMember.department}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            ${staffMember.salary.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(
                              staffMember.hireDate
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={staffMember.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewStaff(staffMember)}
                                className="hover:bg-purple-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStaff(staffMember)}
                                className="hover:bg-purple-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-purple-50"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View User Dialog */}
        <Dialog open={viewUserOpen} onOpenChange={setViewUserOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                User Details
              </DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Name
                    </Label>
                    <p className="text-sm">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p className="text-sm">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p className="text-sm">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Role
                    </Label>
                    <Badge
                      variant={
                        selectedUser.role === "admin"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {selectedUser.role}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Department
                    </Label>
                    <p className="text-sm">{selectedUser.department || "-"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Last Login
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Created
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewUserOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit User
              </DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="editUserName"
                    className="text-[#213555] font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="editUserName"
                    defaultValue={selectedUser.name}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editUserEmail"
                    className="text-[#213555] font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    id="editUserEmail"
                    type="email"
                    defaultValue={selectedUser.email}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editUserPhone"
                    className="text-[#213555] font-medium"
                  >
                    Phone
                  </Label>
                  <Input
                    id="editUserPhone"
                    defaultValue={selectedUser.phone}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editUserRole"
                    className="text-[#213555] font-medium"
                  >
                    Role
                  </Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="editUserStatus"
                    className="text-[#213555] font-medium"
                  >
                    Status
                  </Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditUserOpen(false)}
                    className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditUserOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Staff Dialog */}
        <Dialog open={viewStaffOpen} onOpenChange={setViewStaffOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Staff Details
              </DialogTitle>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Name
                    </Label>
                    <p className="text-sm">{selectedStaff.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p className="text-sm">{selectedStaff.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Position
                    </Label>
                    <p className="text-sm">{selectedStaff.position}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Department
                    </Label>
                    <p className="text-sm">{selectedStaff.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Salary
                    </Label>
                    <p className="text-sm">
                      ${selectedStaff.salary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Hire Date
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedStaff.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <StatusBadge status={selectedStaff.status} />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Permissions
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedStaff.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewStaffOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit Staff
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Staff Dialog */}
        <Dialog open={editStaffOpen} onOpenChange={setEditStaffOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Staff Member
              </DialogTitle>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="editStaffName"
                    className="text-[#213555] font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="editStaffName"
                    defaultValue={selectedStaff.name}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editStaffEmail"
                    className="text-[#213555] font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    id="editStaffEmail"
                    type="email"
                    defaultValue={selectedStaff.email}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editStaffPhone"
                    className="text-[#213555] font-medium"
                  >
                    Phone
                  </Label>
                  <Input
                    id="editStaffPhone"
                    defaultValue={selectedStaff.phone}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editStaffPosition"
                    className="text-[#213555] font-medium"
                  >
                    Position
                  </Label>
                  <Input
                    id="editStaffPosition"
                    defaultValue={selectedStaff.position}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editStaffDepartment"
                    className="text-[#213555] font-medium"
                  >
                    Department
                  </Label>
                  <Select
                    defaultValue={selectedStaff.department
                      .toLowerCase()
                      .replace(" & ", "-")
                      .replace(" ", "-")}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="front-office">Front Office</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="food-beverage">
                        Food & Beverage
                      </SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="editStaffSalary"
                    className="text-[#213555] font-medium"
                  >
                    Salary
                  </Label>
                  <Input
                    id="editStaffSalary"
                    type="number"
                    defaultValue={selectedStaff.salary}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editStaffStatus"
                    className="text-[#213555] font-medium"
                  >
                    Status
                  </Label>
                  <Select defaultValue={selectedStaff.status}>
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditStaffOpen(false)}
                    className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditStaffOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserManagementPage;
