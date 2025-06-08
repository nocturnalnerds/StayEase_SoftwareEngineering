"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
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

import {
  Filter,
  Eye,
  Edit,
  Shield,
  UserPlus,
  Search,
  Users,
  ShieldCheck,
  User,
  Trash2,
} from "lucide-react";
import { Staff } from "@/lib/types";
import useUserQuery from "@/hooks/queries/useUserQuery";
import useUserMutation from "@/hooks/mutations/useUserMutation";

export type Department =
  | "Management"
  | "Front Office"
  | "Housekeeping"
  | "Food & Beverage"
  | "Maintenance"
  | "Finance"
  | "all";

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
}> = ({ title, value, icon: Icon, trend }) => {
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

const stats = [
  {
    title: "Total Users",
    value: "10",
    icon: Users,
    trend: "+12%",
    color: "bg-blue-500",
  },
  {
    title: "Active Staff",
    value: "8",
    icon: Shield,
    trend: "+3%",
    color: "bg-green-500",
  },
  {
    title: "Administrators",
    value: "1",
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

const splitName = (name: string) => {
  if (!name) return { firstName: "", lastName: "" };
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
};

const UserManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<Department>("all");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [viewStaffOpen, setViewStaffOpen] = useState(false);
  const [editStaffOpen, setEditStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { staffsData, isLoading: isStaffLoading } = useUserQuery();
  const { addStaffMutation, updateStaffMutation, deleteStaffMutation } =
    useUserMutation();

  useEffect(() => {
    if (!isStaffLoading) {
      setLoading(false);
    }
  }, [isStaffLoading]);

  const handleAddStaff = () => {
    const nameValue =
      (document.getElementById("staffName") as HTMLInputElement | null)
        ?.value || "";
    const { firstName, lastName } = splitName(nameValue);

    const staffField = {
      name: nameValue,
      firstName,
      lastName,
      phone: (document.getElementById("staffPhone") as HTMLInputElement | null)
        ?.value,
      department: selectedDepartment,
      salary: Number(
        (document.getElementById("staffSalary") as HTMLInputElement | null)
          ?.value
      ),
    };
    // Ensure all required fields are filled
    if (
      !staffField.name ||
      !staffField.phone ||
      !staffField.department ||
      !staffField.salary
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Call the mutation for adding staff
    addStaffMutation.mutate(staffField, {
      onSuccess: () => {
        setIsAddStaffOpen(false); // Close the dialog
        document.getElementById("staffName")?.setAttribute("value", "");
        document.getElementById("staffPhone")?.setAttribute("value", "");
        document.getElementById("staffDepartment")?.setAttribute("value", "");
        document.getElementById("staffSalary")?.setAttribute("value", "");
      },
    });
  };

  const handleUpdateStaff = () => {
    if (!selectedStaff) return;

    const nameValue =
      (document.getElementById("editStaffName") as HTMLInputElement | null)
        ?.value || "";
    const { firstName, lastName } = splitName(nameValue);

    const staffField = {
      id: selectedStaff.id,
      name: nameValue,
      firstName,
      lastName,
      phone: (
        document.getElementById("editStaffPhone") as HTMLInputElement | null
      )?.value,
      department: selectedDepartment || selectedStaff.department,
      salary: Number(
        (document.getElementById("editStaffSalary") as HTMLInputElement | null)
          ?.value
      ),
      status: (
        document.getElementById("editStaffStatus") as HTMLSelectElement | null
      )?.value,
    };

    // Ensure all required fields are filled
    if (
      !staffField.name ||
      !staffField.phone ||
      !staffField.department ||
      !staffField.salary
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Call the mutation for updating staff
    updateStaffMutation.mutate(staffField, {
      onSuccess: () => {
        setEditStaffOpen(false); // Close the dialog
        setSelectedStaff(null);
      },
    });
  };

  const handleDeleteStaff = (staffId: number) => {
    if (!window.confirm("Are you sure you want to delete this staff member?"))
      return;

    deleteStaffMutation.mutate(staffId);
  };

  const handleViewStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setViewStaffOpen(true);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setEditStaffOpen(true);
    console.log("Editing staff member:", staffMember);
  };

  const filteredStaff = staffsData.filter(
    (staffMember) =>
      (filterDepartment === "all" ||
        staffMember.department === filterDepartment) &&
      `${staffMember.firstName} ${staffMember.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Staff Dashboard...
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
              Staff Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage staff, departments, and permissions efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

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
                      htmlFor="staffDepartment"
                      className="text-[#213555] font-medium"
                    >
                      Department
                    </Label>
                    <Select
                      value={selectedDepartment}
                      onValueChange={setSelectedDepartment}
                    >
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
                      variant="outline"
                      onClick={() => setIsAddStaffOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddStaff}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] text-white transition-colors duration-200"
                    >
                      Add Staff
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

        {/* Staff Table */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md min-h-screen rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
            <div className="flex justify-between items-center gap-12">
              {" "}
              <CardTitle className="text-xl font-bold">
                Staff Management
              </CardTitle>
              <div className="flex space-x-6">
                {" "}
                <Select
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger className="w-50 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Department</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Front Office">Front Office</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Food & Beverage">
                      Food & Beverage
                    </SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full bg-gradient-to-b from-gray-50/50 to-white">
            <div className="overflow-x-auto flex-grow w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Name
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Phone
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Department
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Salary
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Hire Date
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left">
                      Status
                    </th>
                    <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staffMember, index) => (
                    <tr
                      key={staffMember.id}
                      className={`group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900 group-hover:text-[#213555] transition-colors">
                          {staffMember.firstName} {staffMember.lastName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-700 font-medium">
                          {staffMember.phone}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {staffMember.department}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-green-700">
                          ${staffMember.salary.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-600 font-medium">
                          {new Date(staffMember.hireDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={staffMember.status} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewStaff(staffMember)}
                            className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg p-2 group/btn"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditStaff(staffMember)}
                            className="hover:bg-amber-100 hover:text-amber-700 transition-all duration-200 rounded-lg p-2 group/btn"
                            title="Edit Staff"
                          >
                            <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-red-100 hover:text-red-700 transition-all duration-200 rounded-lg p-2 group/btn"
                            title="Trash"
                            onClick={() => handleDeleteStaff(staffMember.id)}
                          >
                            <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStaff.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No staff members found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your filter criteria
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                    <p className="text-sm">
                      {selectedStaff.firstName} {selectedStaff.lastName}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p className="text-sm">{selectedStaff.phone}</p>
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

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewStaffOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C] text-white">
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
                    defaultValue={`${selectedStaff.firstName} ${selectedStaff.lastName}`}
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
                    variant="outline"
                    onClick={() => setEditStaffOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setEditStaffOpen(false)}
                    className="flex-1 bg-[#213555] hover:bg-[#4F709C] text-white transition-colors duration-200"
                  >
                    Save Changes
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
