"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  User,
  Coffee,
  UtensilsCrossed,
  ChefHat,
  DollarSign,
} from "lucide-react";

interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: "pending" | "preparing" | "ready" | "served" | "cancelled";
  time: string;
  customerName: string;
  total: number;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

const RestaurantPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isAddMenuDialogOpen, setIsAddMenuDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveOrders([
        {
          id: "ORD-001",
          tableNumber: 5,
          items: [
            { id: "ITEM-1", name: "Caesar Salad", quantity: 2, price: 12.99 },
            {
              id: "ITEM-2",
              name: "Grilled Salmon",
              quantity: 1,
              price: 24.99,
              notes: "Medium well",
            },
            { id: "ITEM-3", name: "Sparkling Water", quantity: 2, price: 3.99 },
          ],
          status: "preparing",
          time: "10:30 AM",
          customerName: "John Smith",
          total: 58.95,
        },
        {
          id: "ORD-002",
          tableNumber: 8,
          items: [
            {
              id: "ITEM-4",
              name: "Margherita Pizza",
              quantity: 1,
              price: 16.99,
            },
            { id: "ITEM-5", name: "Tiramisu", quantity: 2, price: 8.99 },
            { id: "ITEM-6", name: "Espresso", quantity: 2, price: 4.5 },
          ],
          status: "pending",
          time: "10:45 AM",
          customerName: "Emma Johnson",
          total: 43.97,
        },
        {
          id: "ORD-003",
          tableNumber: 3,
          items: [
            { id: "ITEM-7", name: "Club Sandwich", quantity: 1, price: 14.99 },
            { id: "ITEM-8", name: "French Fries", quantity: 1, price: 5.99 },
            { id: "ITEM-9", name: "Iced Tea", quantity: 1, price: 3.5 },
          ],
          status: "ready",
          time: "11:00 AM",
          customerName: "Michael Brown",
          total: 24.48,
        },
        {
          id: "ORD-004",
          tableNumber: 12,
          items: [
            { id: "ITEM-10", name: "Beef Burger", quantity: 2, price: 18.99 },
            { id: "ITEM-11", name: "Onion Rings", quantity: 1, price: 6.99 },
            {
              id: "ITEM-12",
              name: "Chocolate Milkshake",
              quantity: 2,
              price: 7.5,
            },
          ],
          status: "served",
          time: "11:15 AM",
          customerName: "Sarah Wilson",
          total: 59.97,
        },
      ]);

      setMenuItems([
        {
          id: "MENU-1",
          name: "Caesar Salad",
          category: "Appetizers",
          price: 12.99,
          description:
            "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese",
          available: true,
        },
        {
          id: "MENU-2",
          name: "Grilled Salmon",
          category: "Main Course",
          price: 24.99,
          description:
            "Fresh salmon fillet grilled to perfection with lemon butter sauce",
          available: true,
        },
        {
          id: "MENU-3",
          name: "Margherita Pizza",
          category: "Pizza",
          price: 16.99,
          description:
            "Classic pizza with tomato sauce, mozzarella, and fresh basil",
          available: true,
        },
        {
          id: "MENU-4",
          name: "Tiramisu",
          category: "Desserts",
          price: 8.99,
          description:
            "Italian dessert made of ladyfingers dipped in coffee with mascarpone cheese",
          available: true,
        },
        {
          id: "MENU-5",
          name: "Espresso",
          category: "Beverages",
          price: 4.5,
          description:
            "Strong black coffee brewed by forcing hot water through finely-ground coffee beans",
          available: true,
        },
        {
          id: "MENU-6",
          name: "Club Sandwich",
          category: "Sandwiches",
          price: 14.99,
          description:
            "Triple-decker sandwich with chicken, bacon, lettuce, tomato, and mayo",
          available: true,
        },
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setActiveOrders((orders) =>
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case "served":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Restaurant Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">
              Restaurant Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage orders, menu items, and kitchen operations
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pending Orders
                  </p>
                  <p className="text-3xl font-bold">
                    {
                      activeOrders.filter((order) => order.status === "pending")
                        .length
                    }
                  </p>
                  <p className="text-xs text-orange-200 mt-1">
                    Awaiting preparation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    Preparing
                  </p>
                  <p className="text-3xl font-bold">
                    {
                      activeOrders.filter(
                        (order) => order.status === "preparing"
                      ).length
                    }
                  </p>
                  <p className="text-xs text-blue-200 mt-1">In kitchen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Active Tables
                  </p>
                  <p className="text-3xl font-bold">
                    {
                      new Set(activeOrders.map((order) => order.tableNumber))
                        .size
                    }
                  </p>
                  <p className="text-xs text-green-200 mt-1">
                    Currently dining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Today's Revenue
                  </p>
                  <p className="text-3xl font-bold">
                    $
                    {activeOrders
                      .reduce((sum, order) => sum + order.total, 0)
                      .toFixed(0)}
                  </p>
                  <p className="text-xs text-purple-200 mt-1">Total sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full flex-1 flex flex-col">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Active Orders
                </TabsTrigger>
                <TabsTrigger
                  value="menu"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Menu Management
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="orders"
              className="p-6 space-y-6 flex-1 flex flex-col"
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    Active Orders
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Manage current restaurant orders
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <Table className="min-w-full table-fixed h-full">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-[#213555] w-[12%]">
                            Order ID
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[10%]">
                            Table
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[20%]">
                            Customer
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[15%]">
                            Time
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[15%]">
                            Status
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[12%]">
                            Total
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[16%]">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeOrders.map((order) => (
                          <TableRow
                            key={order.id}
                            className="hover:bg-orange-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-[#4F709C]">
                              {order.id}
                            </TableCell>
                            <TableCell className="font-medium">
                              Table {order.tableNumber}
                            </TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell className="text-gray-600">
                              {order.time}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  order.status
                                )} transition-all duration-200 hover:scale-105`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-green-600">
                              ${order.total.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsOrderDialogOpen(true);
                                }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="menu"
              className="p-6 space-y-6 flex-1 flex flex-col"
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Coffee className="h-5 w-5" />
                        Menu Management
                      </CardTitle>
                      <CardDescription className="text-red-100">
                        Manage your restaurant menu items
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#4F709C]" />
                        <Input
                          placeholder="Search menu items..."
                          className="pl-8 w-full sm:w-[250px] bg-white border-gray-200 focus:border-[#4F709C] text-[#213555]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full sm:w-[160px] bg-white  border-gray-200 focus:border-[#4F709C] text-[#213555]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#213555]">
                          {categories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                              className="text-[#213555]"
                            >
                              {category === "all" ? "All Categories" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Dialog
                        open={isAddMenuDialogOpen}
                        onOpenChange={setIsAddMenuDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-0 shadow-2xl sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-[#213555]">
                              Add Menu Item
                            </DialogTitle>
                            <DialogDescription>
                              Add a new item to your restaurant menu
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="name"
                                className="text-[#213555] font-medium"
                              >
                                Item Name
                              </Label>
                              <Input
                                id="name"
                                placeholder="Enter item name"
                                className="border-gray-200 focus:border-[#4F709C]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="category"
                                className="text-[#213555] font-medium"
                              >
                                Category
                              </Label>
                              <Select>
                                <SelectTrigger
                                  id="category"
                                  className="border-gray-200 focus:border-[#4F709C]"
                                >
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {categories
                                    .filter((c) => c !== "all")
                                    .map((category) => (
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
                                        {category}
                                      </SelectItem>
                                    ))}
                                  <SelectItem value="new">
                                    + Add New Category
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="price"
                                className="text-[#213555] font-medium"
                              >
                                Price ($)
                              </Label>
                              <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="border-gray-200 focus:border-[#4F709C]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="description"
                                className="text-[#213555] font-medium"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="description"
                                placeholder="Enter item description"
                                className="min-h-[100px] border-gray-200 focus:border-[#4F709C]"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddMenuDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
                              Save Item
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <Table className="min-w-full table-fixed h-full">
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-[#213555] w-[30%]">
                            Name
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[20%]">
                            Category
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[15%]">
                            Price
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[15%]">
                            Status
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555] w-[20%]">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMenuItems.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center py-12"
                            >
                              <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                              <h3 className="text-lg font-medium text-gray-900">
                                No menu items found
                              </h3>
                              <p className="text-gray-500">
                                Try adjusting your search or filters
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredMenuItems.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-red-50 transition-colors duration-200"
                            >
                              <TableCell>
                                <div>
                                  <p className="font-medium text-[#4F709C]">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-500 line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-red-50 text-red-700 border-red-200"
                                >
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold text-green-600">
                                ${item.price.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    item.available
                                      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                      : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                                  }
                                >
                                  {item.available ? "Available" : "Unavailable"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                    onClick={() => {
                                      setSelectedMenuItem(item);
                                      setIsMenuDialogOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Order {selectedOrder?.id}
              </DialogTitle>
              <DialogDescription>
                Table {selectedOrder?.tableNumber} •{" "}
                {selectedOrder?.customerName} • {selectedOrder?.time}
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3 text-[#213555]">
                    Order Items
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start bg-white p-3 rounded border"
                      >
                        <div>
                          <p className="font-medium">
                            {item.quantity}x {item.name}
                          </p>
                          {item.notes && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-green-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                  <p className="text-[#213555]">Total</p>
                  <p className="text-green-600">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3 text-[#213555]">
                    Update Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "pending",
                      "preparing",
                      "ready",
                      "served",
                      "cancelled",
                    ].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={
                          selectedOrder.status === status
                            ? "default"
                            : "outline"
                        }
                        className={
                          selectedOrder.status === status
                            ? "bg-[#213555] hover:bg-[#4F709C] text-white"
                            : "hover:bg-orange-50 hover:border-orange-300"
                        }
                        onClick={() =>
                          updateOrderStatus(
                            selectedOrder.id,
                            status as Order["status"]
                          )
                        }
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Menu Item Dialog */}
        <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Menu Item
              </DialogTitle>
              <DialogDescription>Update menu item details</DialogDescription>
            </DialogHeader>
            {selectedMenuItem && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-name"
                    className="text-[#213555] font-medium"
                  >
                    Item Name
                  </Label>
                  <Input
                    id="edit-name"
                    defaultValue={selectedMenuItem.name}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-category"
                    className="text-[#213555] font-medium"
                  >
                    Category
                  </Label>
                  <Select defaultValue={selectedMenuItem.category}>
                    <SelectTrigger
                      id="edit-category"
                      className="border-gray-200 focus:border-[#4F709C]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories
                        .filter((c) => c !== "all")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-price"
                    className="text-[#213555] font-medium"
                  >
                    Price ($)
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    defaultValue={selectedMenuItem.price}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-description"
                    className="text-[#213555] font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    defaultValue={selectedMenuItem.description}
                    className="min-h-[100px] border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-available"
                    defaultChecked={selectedMenuItem.available}
                    className="rounded border-gray-300"
                  />
                  <Label
                    htmlFor="edit-available"
                    className="text-[#213555] font-medium"
                  >
                    Available
                  </Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsMenuDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RestaurantPage;
