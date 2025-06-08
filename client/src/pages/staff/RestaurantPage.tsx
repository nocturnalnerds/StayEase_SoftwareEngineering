"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
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
  Plus,
  Clock,
  User,
  UtensilsCrossed,
  ChefHat,
  DollarSign,
  Eye,
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

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
          <div>
            <Dialog
              open={isAddItemDialogOpen}
              onOpenChange={setIsAddItemDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Order
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New Order
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a new menu item for the restaurant
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="item-name"
                        className="text-[#213555] font-medium"
                      >
                        Item Name
                      </Label>
                      <Input
                        id="item-name"
                        placeholder="e.g., Chicken Alfredo"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="item-category"
                        className="text-[#213555] font-medium"
                      >
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="item-category"
                          className="border-gray-200 focus:border-[#4F709C]"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="main">Main Course</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="text-[#213555] font-medium"
                      >
                        Price
                      </Label>
                      <Input
                        id="price"
                        placeholder="e.g., 15.99"
                        type="number"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="available"
                        className="text-[#213555] font-medium"
                      >
                        Availability
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="available"
                          className="border-gray-200 focus:border-[#4F709C]"
                        >
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="out-of-stock">
                            Out of Stock
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      placeholder="Add any special details about the item..."
                      className="min-h-[100px] border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddItemDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white border-2">
                    Add Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
        <div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-6 w-6" />
                <div>
                  <h2 className="text-xl font-bold">Active Orders</h2>
                  <p className="text-orange-100">
                    Manage current restaurant orders
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="orders"
            className="w-full flex-1 flex flex-col min-w-0"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex-1 w-full min-w-0">
              <div className="p-0 flex-1 w-full min-w-0">
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed min-w-full rounded-none">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Order ID
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Table
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Customer
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Time
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Status
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Total
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/7">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-orange-50 transition-colors duration-200"
                        >
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {order.id}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            Table {order.tableNumber}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customerName}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.time}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )} transition-all duration-200 hover:scale-105`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <button
                              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsOrderDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Tabs>
        </div>

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
      </div>
    </div>
  );
};

export default RestaurantPage;
