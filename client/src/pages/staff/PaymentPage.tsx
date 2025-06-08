"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/TextArea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  DollarSign,
  Receipt,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Edit,
  Trash2,
} from "lucide-react";

interface Payment {
  id: string;
  transactionId: string;
  guestName: string;
  roomNumber: string;
  amount: number;
  paymentMethod: "cash" | "credit-card" | "debit-card" | "bank-transfer";
  paymentType: "room-charge" | "restaurant" | "spa" | "laundry" | "other";
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  description: string;
  processedBy: string;
}

// Simple StatsCard component
const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: { value: number; isPositive: boolean };
  color: string;
}> = ({ title, value, icon, trend, color }) => {
  return (
    <Card
      className={`${color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        <div className="opacity-80">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">
          <span
            className={trend.isPositive ? "text-green-300" : "text-red-300"}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
};

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isProcessPaymentOpen, setIsProcessPaymentOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isViewPaymentOpen, setIsViewPaymentOpen] = useState(false);
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Mock data
  const payments: Payment[] = [
    {
      id: "1",
      transactionId: "TXN-2024-001",
      guestName: "John Doe",
      roomNumber: "101",
      amount: 450.0,
      paymentMethod: "credit-card",
      paymentType: "room-charge",
      status: "completed",
      date: "2024-01-15T14:30:00Z",
      description: "Room payment for 3 nights",
      processedBy: "Alice Johnson",
    },
    {
      id: "2",
      transactionId: "TXN-2024-002",
      guestName: "Jane Smith",
      roomNumber: "205",
      amount: 85.5,
      paymentMethod: "cash",
      paymentType: "restaurant",
      status: "completed",
      date: "2024-01-15T12:15:00Z",
      description: "Restaurant bill",
      processedBy: "Bob Wilson",
    },
    {
      id: "3",
      transactionId: "TXN-2024-003",
      guestName: "Mike Johnson",
      roomNumber: "302",
      amount: 120.0,
      paymentMethod: "debit-card",
      paymentType: "spa",
      status: "pending",
      date: "2024-01-15T16:45:00Z",
      description: "Spa services",
      processedBy: "Carol Davis",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit-card":
      case "debit-card":
        return <CreditCard className="h-4 w-4" />;
      case "cash":
        return <DollarSign className="h-4 w-4" />;
      case "bank-transfer":
        return <Receipt className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewPaymentOpen(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditPaymentOpen(true);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Payment & Cashier...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">
              Payment & Cashier
            </h1>
            <p className="text-gray-600 mt-2">
              Manage payments and financial transactions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog
              open={isProcessPaymentOpen}
              onOpenChange={setIsProcessPaymentOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Process New Payment
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="guest"
                        className="text-[#213555] font-medium"
                      >
                        Guest Name
                      </Label>
                      <Input
                        id="guest"
                        placeholder="Enter guest name"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="room"
                        className="text-[#213555] font-medium"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="room"
                        placeholder="Enter room number"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="amount"
                        className="text-[#213555] font-medium"
                      >
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="method"
                        className="text-[#213555] font-medium"
                      >
                        Payment Method
                      </Label>
                      <Select>
                        <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="credit-card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="debit-card">Debit Card</SelectItem>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="type"
                      className="text-[#213555] font-medium"
                    >
                      Payment Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="room-charge">Room Charge</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="spa">Spa</SelectItem>
                        <SelectItem value="laundry">Laundry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-[#213555] font-medium"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Payment description"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsProcessPaymentOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className=" bg-[#213555] hover:bg-[#4F709C] text-white">
                      Process Payment
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isCreateInvoiceOpen}
              onOpenChange={setIsCreateInvoiceOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Receipt className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Create New Invoice
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="invoiceGuest"
                        className="text-[#213555] font-medium"
                      >
                        Guest Name
                      </Label>
                      <Input
                        id="invoiceGuest"
                        placeholder="Enter guest name"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="invoiceRoom"
                        className="text-[#213555] font-medium"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="invoiceRoom"
                        placeholder="Enter room number"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="checkIn"
                        className="text-[#213555] font-medium"
                      >
                        Check-in Date
                      </Label>
                      <Input
                        id="checkIn"
                        type="date"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="checkOut"
                        className="text-[#213555] font-medium"
                      >
                        Check-out Date
                      </Label>
                      <Input
                        id="checkOut"
                        type="date"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="roomCharges"
                        className="text-[#213555] font-medium"
                      >
                        Room Charges
                      </Label>
                      <Input
                        id="roomCharges"
                        type="number"
                        placeholder="0.00"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="additionalCharges"
                        className="text-[#213555] font-medium"
                      >
                        Additional Charges
                      </Label>
                      <Input
                        id="additionalCharges"
                        type="number"
                        placeholder="0.00"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="dueDate"
                      className="text-[#213555] font-medium"
                    >
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateInvoiceOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-[#213555] hover:bg-[#4F709C] text-white">
                      Create Invoice
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Today's Revenue"
            value="$2,450.00"
            icon={<DollarSign className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Pending Payments"
            value="$1,200.00"
            icon={<RefreshCw className="h-6 w-6" />}
            trend={{ value: 5, isPositive: false }}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatsCard
            title="Total Transactions"
            value="45"
            icon={<Receipt className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            title="Outstanding Invoices"
            value="12"
            icon={<CreditCard className="h-6 w-6" />}
            trend={{ value: 3, isPositive: false }}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm min-h-screen">
          <CardHeader>
            <div className="flex justify-between items-center gap-8">
              <CardTitle className="text-[#213555]">
                Financial Management
              </CardTitle>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-50 border-gray-200 focus:border-[#4F709C]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-8 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg px-6 py-4">
                <h3 className="text-lg font-semibold">Payment Transactions</h3>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <Table className="h-full w-full min-w-[1200px]">
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                        <TableHead className="font-semibold text-[#213555] min-w-[140px]">
                          Transaction ID
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[120px]">
                          Guest Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[80px]">
                          Room
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[100px]">
                          Amount
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[120px]">
                          Method
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[100px]">
                          Type
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[100px]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[100px]">
                          Date
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555] min-w-[160px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="flex-1">
                      {filteredPayments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-[#4F709C] min-w-[140px]">
                            {payment.transactionId}
                          </TableCell>
                          <TableCell className="text-gray-700 min-w-[120px]">
                            {payment.guestName}
                          </TableCell>
                          <TableCell className="text-gray-700 min-w-[80px]">
                            {payment.roomNumber}
                          </TableCell>
                          <TableCell className="font-medium text-[#213555] min-w-[100px]">
                            ${payment.amount}
                          </TableCell>
                          <TableCell className="min-w-[120px]">
                            <div className="flex items-center gap-2 text-gray-700">
                              {getPaymentMethodIcon(payment.paymentMethod)}
                              <span className="capitalize">
                                {payment.paymentMethod.replace("-", " ")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize text-gray-700 min-w-[100px]">
                            {payment.paymentType.replace("-", " ")}
                          </TableCell>
                          <TableCell className="min-w-[100px]">
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 min-w-[100px]">
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="min-w-[160px]">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewPayment(payment)}
                                className="hover:bg-blue-50 transition-all duration-200"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPayment(payment)}
                                className="hover:bg-blue-50 transition-all duration-200"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50 transition-all duration-200"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-50 transition-all duration-200"
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Payment Dialog */}
        <Dialog open={isViewPaymentOpen} onOpenChange={setIsViewPaymentOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#213555] text-xl font-bold">
                Payment Details
              </DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Transaction ID
                    </Label>
                    <p className="font-medium text-[#213555]">
                      {selectedPayment.transactionId}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Amount
                    </Label>
                    <p className="font-bold text-lg text-[#213555]">
                      ${selectedPayment.amount}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Guest Name
                    </Label>
                    <p className="font-medium text-[#213555]">
                      {selectedPayment.guestName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room Number
                    </Label>
                    <p className="font-medium text-[#213555]">
                      {selectedPayment.roomNumber}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Payment Method
                    </Label>
                    <p className="capitalize text-gray-700">
                      {selectedPayment.paymentMethod.replace("-", " ")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Payment Type
                    </Label>
                    <p className="capitalize text-gray-700">
                      {selectedPayment.paymentType.replace("-", " ")}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <Badge className={getStatusColor(selectedPayment.status)}>
                    {selectedPayment.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Description
                  </Label>
                  <p className="text-gray-700">{selectedPayment.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Date
                    </Label>
                    <p className="text-gray-700">
                      {new Date(selectedPayment.date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Processed By
                    </Label>
                    <p className="text-gray-700">
                      {selectedPayment.processedBy}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewPaymentOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className=" bg-[#213555] hover:bg-[#4F709C] text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Payment Dialog */}
        <Dialog open={isEditPaymentOpen} onOpenChange={setIsEditPaymentOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#213555] text-xl font-bold">
                Edit Payment
              </DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editGuest"
                      className="text-[#213555] font-medium"
                    >
                      Guest Name
                    </Label>
                    <Input
                      id="editGuest"
                      defaultValue={selectedPayment.guestName}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editRoom"
                      className="text-[#213555] font-medium"
                    >
                      Room Number
                    </Label>
                    <Input
                      id="editRoom"
                      defaultValue={selectedPayment.roomNumber}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editAmount"
                      className="text-[#213555] font-medium"
                    >
                      Amount
                    </Label>
                    <Input
                      id="editAmount"
                      type="number"
                      defaultValue={selectedPayment.amount}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editStatus"
                      className="text-[#213555] font-medium"
                    >
                      Status
                    </Label>
                    <Select defaultValue={selectedPayment.status}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="editDescription"
                    className="text-[#213555] font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="editDescription"
                    defaultValue={selectedPayment.description}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditPaymentOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className=" bg-[#213555] hover:bg-[#4F709C] text-white">
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

export default PaymentPage;
