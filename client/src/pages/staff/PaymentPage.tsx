"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  CreditCard,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  RefreshCw,
  DollarSign,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/staff/Layout";
import StatusBadge from "@/components/staff/StatusBadge";
import SkeletonStats from "@/components/staff/SkeletonStats";
import SkeletonTable from "@/components/staff/SkeletonTable";
import { reservationData } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

const PaymentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Get all payments from reservations
  const allPayments = reservationData.flatMap((reservation) =>
    reservation.payments.map((payment) => ({
      ...payment,
      reservation: {
        id: reservation.id,
        reservationNumber: reservation.reservationNumber,
        customer: reservation.customer,
      },
    }))
  );

  // Filter payments based on search and status
  const filteredPayments = allPayments.filter((payment) => {
    const matchesSearch =
      payment.paymentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reservation.reservationNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.reservation.customer.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.reservation.customer.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || payment.paymentStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Group payments by status
  const paymentsByStatus = {
    Completed: filteredPayments.filter(
      (payment) => payment.paymentStatus === "Completed"
    ),
    Pending: filteredPayments.filter(
      (payment) => payment.paymentStatus === "Pending"
    ),
    Failed: filteredPayments.filter(
      (payment) => payment.paymentStatus === "Failed"
    ),
    Refunded: filteredPayments.filter(
      (payment) => payment.paymentStatus === "Refunded"
    ),
  };

  // Calculate total amounts
  const totalCompleted = paymentsByStatus.Completed.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const totalPending = paymentsByStatus.Pending.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Payment Management
          </h1>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Payment
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-secondary/20"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px] border-secondary/20">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border-secondary/20"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonStats key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-xl font-bold">
                      {paymentsByStatus.Completed.length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">
                    {formatCurrency(totalCompleted)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 mr-3">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-xl font-bold">
                      {paymentsByStatus.Pending.length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">{formatCurrency(totalPending)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 mr-3">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Failed</p>
                    <p className="text-xl font-bold">
                      {paymentsByStatus.Failed.length}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-red-800">
                  View
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 mr-3">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Refunded</p>
                    <p className="text-xl font-bold">
                      {paymentsByStatus.Refunded.length}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-800">
                  View
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="transactions" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <SkeletonTable columnCount={8} rowCount={5} />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/10">
                          <th className="text-left p-4 font-medium text-gray-500">
                            Payment #
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Reservation
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Customer
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Amount
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Method
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Date
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Status
                          </th>
                          <th className="text-right p-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr
                            key={payment.id}
                            className="border-b border-secondary/10 hover:bg-secondary/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 text-secondary mr-2" />
                                <span className="font-medium">
                                  {payment.paymentNumber}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              {payment.reservation.reservationNumber}
                            </td>
                            <td className="p-4">
                              {payment.reservation.customer.firstName}{" "}
                              {payment.reservation.customer.lastName}
                            </td>
                            <td className="p-4 font-medium">
                              {formatCurrency(payment.amount)}
                            </td>
                            <td className="p-4">
                              <Badge
                                variant="outline"
                                className="bg-secondary/5 border-secondary/20"
                              >
                                {payment.paymentMethod}
                              </Badge>
                            </td>
                            <td className="p-4">
                              {formatDate(payment.paymentDate)}
                            </td>
                            <td className="p-4">
                              <StatusBadge status={payment.paymentStatus} />
                            </td>
                            <td className="p-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Receipt className="h-4 w-4 mr-2" />
                                    View Receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  {payment.paymentStatus === "Pending" && (
                                    <DropdownMenuItem>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                  {payment.paymentStatus === "Completed" && (
                                    <DropdownMenuItem>
                                      <RefreshCw className="h-4 w-4 mr-2" />
                                      Refund
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <SkeletonTable columnCount={7} rowCount={5} />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/10">
                          <th className="text-left p-4 font-medium text-gray-500">
                            Invoice #
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Customer
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Amount
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Issue Date
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Due Date
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Status
                          </th>
                          <th className="text-right p-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(5)].map((_, index) => {
                          const reservation =
                            reservationData[index % reservationData.length];
                          const isPaid = index % 3 === 0;
                          const isOverdue = index % 3 === 1;
                          const status = isPaid
                            ? "Paid"
                            : isOverdue
                            ? "Overdue"
                            : "Pending";

                          return (
                            <tr
                              key={index}
                              className="border-b border-secondary/10 hover:bg-secondary/5"
                            >
                              <td className="p-4">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-secondary mr-2" />
                                  <span className="font-medium">
                                    INV-2023-{1000 + index}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                {reservation.customer.firstName}{" "}
                                {reservation.customer.lastName}
                              </td>
                              <td className="p-4 font-medium">
                                {formatCurrency(reservation.totalAmount)}
                              </td>
                              <td className="p-4">
                                {formatDate(reservation.createdAt)}
                              </td>
                              <td className="p-4">
                                {formatDate(
                                  new Date(
                                    new Date(reservation.createdAt).setDate(
                                      new Date(
                                        reservation.createdAt
                                      ).getDate() + 30
                                    )
                                  ).toISOString()
                                )}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    status === "Paid"
                                      ? "bg-green-100 text-green-800"
                                      : status === "Overdue"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {status}
                                </Badge>
                              </td>
                              <td className="p-4 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mr-2 border-secondary/20"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                                {!isPaid && (
                                  <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    Pay
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentPage;
