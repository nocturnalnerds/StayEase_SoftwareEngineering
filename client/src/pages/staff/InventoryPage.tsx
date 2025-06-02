"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
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
  Package,
  PackagePlus,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Edit,
  Eye,
  ShoppingCart,
  Truck,
  BarChart3,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: "pending" | "approved" | "delivered" | "cancelled";
}

// Simple StatusBadge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
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
    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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

const InventoryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [viewItemOpen, setViewItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(
    null
  );

  // Mock data
  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Toilet Paper",
      category: "Housekeeping",
      sku: "HK-TP-001",
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      unit: "rolls",
      unitPrice: 2.5,
      supplier: "CleanCorp",
      lastRestocked: "2024-01-10",
      status: "in-stock",
    },
    {
      id: "2",
      name: "Towels",
      category: "Housekeeping",
      sku: "HK-TW-001",
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unit: "pieces",
      unitPrice: 15.0,
      supplier: "LinenSupply",
      lastRestocked: "2024-01-05",
      status: "low-stock",
    },
    {
      id: "3",
      name: "Coffee Beans",
      category: "Food & Beverage",
      sku: "FB-CB-001",
      currentStock: 0,
      minStock: 10,
      maxStock: 50,
      unit: "kg",
      unitPrice: 25.0,
      supplier: "CoffeeWorld",
      lastRestocked: "2023-12-20",
      status: "out-of-stock",
    },
    {
      id: "4",
      name: "Bed Sheets",
      category: "Housekeeping",
      sku: "HK-BS-001",
      currentStock: 80,
      minStock: 40,
      maxStock: 120,
      unit: "sets",
      unitPrice: 35.0,
      supplier: "LinenSupply",
      lastRestocked: "2024-01-12",
      status: "in-stock",
    },
  ];

  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "1",
      orderNumber: "PO-2024-001",
      supplier: "CleanCorp",
      items: 5,
      totalAmount: 1250.0,
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-20",
      status: "pending",
    },
    {
      id: "2",
      orderNumber: "PO-2024-002",
      supplier: "CoffeeWorld",
      items: 3,
      totalAmount: 750.0,
      orderDate: "2024-01-14",
      expectedDelivery: "2024-01-18",
      status: "approved",
    },
    {
      id: "3",
      orderNumber: "PO-2024-003",
      supplier: "LinenSupply",
      items: 8,
      totalAmount: 2100.0,
      orderDate: "2024-01-10",
      expectedDelivery: "2024-01-15",
      status: "delivered",
    },
  ];

  const stats = [
    {
      title: "Total Items",
      value: "248",
      icon: Package,
      trend: "+5%",
      color: "bg-blue-500",
    },
    {
      title: "Low Stock Items",
      value: "12",
      icon: AlertTriangle,
      trend: "+3",
      color: "bg-orange-500",
    },
    {
      title: "Out of Stock",
      value: "4",
      icon: TrendingUp,
      trend: "-2",
      color: "bg-red-500",
    },
    {
      title: "Total Value",
      value: "$45,230",
      icon: BarChart3,
      trend: "+8%",
      color: "bg-green-500",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) return "out-of-stock";
    if (item.currentStock <= item.minStock) return "low-stock";
    return "in-stock";
  };

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setViewItemOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setEditItemOpen(true);
  };

  const handleViewOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setViewOrderOpen(true);
  };

  const handleEditOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setEditOrderOpen(true);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Inventory Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">
              Inventory Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track stock levels, manage suppliers, and handle purchase orders
              efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-green-50 hover:border-green-300 transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New Inventory Item
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="itemName"
                      className="text-[#213555] font-medium"
                    >
                      Item Name
                    </Label>
                    <Input
                      id="itemName"
                      placeholder="Enter item name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="itemSku"
                      className="text-[#213555] font-medium"
                    >
                      SKU
                    </Label>
                    <Input
                      id="itemSku"
                      placeholder="Enter SKU"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="itemCategory"
                      className="text-[#213555] font-medium"
                    >
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="housekeeping">
                          Housekeeping
                        </SelectItem>
                        <SelectItem value="food-beverage">
                          Food & Beverage
                        </SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="office">Office Supplies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="minStock"
                        className="text-[#213555] font-medium"
                      >
                        Min Stock
                      </Label>
                      <Input
                        id="minStock"
                        type="number"
                        placeholder="0"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="maxStock"
                        className="text-[#213555] font-medium"
                      >
                        Max Stock
                      </Label>
                      <Input
                        id="maxStock"
                        type="number"
                        placeholder="0"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="unit"
                        className="text-[#213555] font-medium"
                      >
                        Unit
                      </Label>
                      <Input
                        id="unit"
                        placeholder="e.g., pieces, kg"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="unitPrice"
                        className="text-[#213555] font-medium"
                      >
                        Unit Price
                      </Label>
                      <Input
                        id="unitPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="supplier"
                      className="text-[#213555] font-medium"
                    >
                      Supplier
                    </Label>
                    <Input
                      id="supplier"
                      placeholder="Enter supplier name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddItemOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Add Item
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddItemOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Create Purchase Order
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="orderSupplier"
                      className="text-[#213555] font-medium"
                    >
                      Supplier
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="cleancorp">CleanCorp</SelectItem>
                        <SelectItem value="linensupply">LinenSupply</SelectItem>
                        <SelectItem value="coffeeworld">CoffeeWorld</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="expectedDelivery"
                      className="text-[#213555] font-medium"
                    >
                      Expected Delivery
                    </Label>
                    <Input
                      id="expectedDelivery"
                      type="date"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label className="text-[#213555] font-medium">
                      Items to Order
                    </Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {inventoryItems
                        .filter(
                          (item) =>
                            item.status === "low-stock" ||
                            item.status === "out-of-stock"
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2 p-2 border rounded"
                          >
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm flex-1">{item.name}</span>
                            <Input
                              type="number"
                              placeholder="Qty"
                              className="w-16 h-8"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddOrderOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Create Order
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOrderOpen(false)}
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
            <div className="flex justify-between items-center gap-8">
              <CardTitle className="text-xl font-bold">
                Inventory & Orders
              </CardTitle>
              <div className="flex space-x-4">
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="food-beverage">
                      Food & Beverage
                    </SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="office">Office Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 border-b">
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Inventory Items ({inventoryItems.length})
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Purchase Orders ({purchaseOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inventory" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Item Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          SKU
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Stock
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Unit
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Supplier
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
                      {inventoryItems.map((item) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-green-50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#4F709C]">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.unitPrice}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {item.sku}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {item.currentStock} / {item.maxStock}
                            </div>
                            <div className="text-xs text-gray-500">
                              Min: {item.minStock}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {item.unit}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {item.supplier}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={getStockStatus(item)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewItem(item)}
                                className="hover:bg-green-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                                className="hover:bg-green-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-green-50"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Order #
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Supplier
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Items
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Amount
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Order Date
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Expected Delivery
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
                      {purchaseOrders.map((order) => (
                        <TableRow
                          key={order.id}
                          className="hover:bg-green-50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-[#4F709C]">
                            {order.orderNumber}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {order.supplier}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {order.items}
                          </TableCell>
                          <TableCell className="font-medium">
                            ${order.totalAmount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(
                              order.expectedDelivery
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewOrder(order)}
                                className="hover:bg-green-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditOrder(order)}
                                className="hover:bg-green-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-green-50"
                              >
                                <Truck className="h-4 w-4" />
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

        {/* View Item Dialog */}
        <Dialog open={viewItemOpen} onOpenChange={setViewItemOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Item Details
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Name
                    </Label>
                    <p className="text-sm">{selectedItem.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      SKU
                    </Label>
                    <p className="text-sm">{selectedItem.sku}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Category
                    </Label>
                    <p className="text-sm">{selectedItem.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Unit Price
                    </Label>
                    <p className="text-sm">${selectedItem.unitPrice}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Current Stock
                    </Label>
                    <p className="text-sm">
                      {selectedItem.currentStock} {selectedItem.unit}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Min Stock
                    </Label>
                    <p className="text-sm">
                      {selectedItem.minStock} {selectedItem.unit}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Max Stock
                    </Label>
                    <p className="text-sm">
                      {selectedItem.maxStock} {selectedItem.unit}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Supplier
                    </Label>
                    <p className="text-sm">{selectedItem.supplier}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <StatusBadge status={getStockStatus(selectedItem)} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Last Restocked
                  </Label>
                  <p className="text-sm">
                    {new Date(selectedItem.lastRestocked).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewItemOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit Item
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog open={editItemOpen} onOpenChange={setEditItemOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Item
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="editItemName"
                    className="text-[#213555] font-medium"
                  >
                    Item Name
                  </Label>
                  <Input
                    id="editItemName"
                    defaultValue={selectedItem.name}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editItemSku"
                    className="text-[#213555] font-medium"
                  >
                    SKU
                  </Label>
                  <Input
                    id="editItemSku"
                    defaultValue={selectedItem.sku}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editItemCategory"
                    className="text-[#213555] font-medium"
                  >
                    Category
                  </Label>
                  <Select
                    defaultValue={selectedItem.category
                      .toLowerCase()
                      .replace(" & ", "-")
                      .replace(" ", "-")}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="food-beverage">
                        Food & Beverage
                      </SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editMinStock"
                      className="text-[#213555] font-medium"
                    >
                      Min Stock
                    </Label>
                    <Input
                      id="editMinStock"
                      type="number"
                      defaultValue={selectedItem.minStock}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editMaxStock"
                      className="text-[#213555] font-medium"
                    >
                      Max Stock
                    </Label>
                    <Input
                      id="editMaxStock"
                      type="number"
                      defaultValue={selectedItem.maxStock}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editUnit"
                      className="text-[#213555] font-medium"
                    >
                      Unit
                    </Label>
                    <Input
                      id="editUnit"
                      defaultValue={selectedItem.unit}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editUnitPrice"
                      className="text-[#213555] font-medium"
                    >
                      Unit Price
                    </Label>
                    <Input
                      id="editUnitPrice"
                      type="number"
                      step="0.01"
                      defaultValue={selectedItem.unitPrice}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="editSupplier"
                    className="text-[#213555] font-medium"
                  >
                    Supplier
                  </Label>
                  <Input
                    id="editSupplier"
                    defaultValue={selectedItem.supplier}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditItemOpen(false)}
                    className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditItemOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Order Dialog */}
        <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Order Details
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Order Number
                    </Label>
                    <p className="text-sm font-medium">
                      {selectedOrder.orderNumber}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Supplier
                    </Label>
                    <p className="text-sm">{selectedOrder.supplier}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Items Count
                    </Label>
                    <p className="text-sm">{selectedOrder.items} items</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Total Amount
                    </Label>
                    <p className="text-sm font-medium">
                      ${selectedOrder.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Order Date
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Expected Delivery
                    </Label>
                    <p className="text-sm">
                      {new Date(
                        selectedOrder.expectedDelivery
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewOrderOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit Order
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Order Dialog */}
        <Dialog open={editOrderOpen} onOpenChange={setEditOrderOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Order
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="editOrderNumber"
                    className="text-[#213555] font-medium"
                  >
                    Order Number
                  </Label>
                  <Input
                    id="editOrderNumber"
                    defaultValue={selectedOrder.orderNumber}
                    disabled
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editOrderSupplier"
                    className="text-[#213555] font-medium"
                  >
                    Supplier
                  </Label>
                  <Select
                    defaultValue={selectedOrder.supplier
                      .toLowerCase()
                      .replace(" ", "")}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="cleancorp">CleanCorp</SelectItem>
                      <SelectItem value="linensupply">LinenSupply</SelectItem>
                      <SelectItem value="coffeeworld">CoffeeWorld</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="editExpectedDelivery"
                    className="text-[#213555] font-medium"
                  >
                    Expected Delivery
                  </Label>
                  <Input
                    id="editExpectedDelivery"
                    type="date"
                    defaultValue={selectedOrder.expectedDelivery}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="editOrderStatus"
                    className="text-[#213555] font-medium"
                  >
                    Status
                  </Label>
                  <Select defaultValue={selectedOrder.status}>
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditOrderOpen(false)}
                    className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditOrderOpen(false)}
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

export default InventoryPage;
