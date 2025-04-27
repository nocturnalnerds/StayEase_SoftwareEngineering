"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Layout from "@/components/staff/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import StatusBadge from "@/components/staff/StatusBadge";
import SkeletonTable from "@/components/staff/SkeletonTable";
import SkeletonCard from "@/components/staff/SkeletonCard";
import SkeletonStats from "@/components/staff/SkeletonStats";

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
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Simulate loading data
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
        return "default";
      case "preparing":
        return "warning";
      case "ready":
        return "success";
      case "served":
        return "info";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>

          <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse mb-6"></div>

          <SkeletonStats count={3} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonTable rows={4} columns={4} />
            <SkeletonCard className="h-[500px]" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Restaurant Management</h1>
          <p className="text-muted-foreground">Manage orders and menu items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-500 mr-2" />
                <div className="text-3xl font-bold">
                  {
                    activeOrders.filter((order) => order.status === "pending")
                      .length
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-6 w-6 text-blue-500 mr-2" />
                <div className="text-3xl font-bold">
                  {new Set(activeOrders.map((order) => order.tableNumber)).size}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Menu Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Coffee className="h-6 w-6 text-green-500 mr-2" />
                <div className="text-3xl font-bold">{menuItems.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>
                  Manage current restaurant orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="table-container">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Table</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>Table {order.tableNumber}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{order.time}</TableCell>
                          <TableCell>
                            <StatusBadge status={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Order {order.id}</DialogTitle>
                                  <DialogDescription>
                                    Table {order.tableNumber} •{" "}
                                    {order.customerName} • {order.time}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">
                                      Order Items
                                    </h4>
                                    <div className="space-y-2">
                                      {order.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="flex justify-between items-start"
                                        >
                                          <div>
                                            <p className="font-medium">
                                              {item.quantity}x {item.name}
                                            </p>
                                            {item.notes && (
                                              <p className="text-sm text-muted-foreground">
                                                {item.notes}
                                              </p>
                                            )}
                                          </div>
                                          <p>
                                            $
                                            {(
                                              item.price * item.quantity
                                            ).toFixed(2)}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex justify-between font-bold">
                                    <p>Total</p>
                                    <p>${order.total.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">
                                      Update Status
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      <Button
                                        size="sm"
                                        variant={
                                          order.status === "pending"
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          updateOrderStatus(order.id, "pending")
                                        }
                                      >
                                        Pending
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={
                                          order.status === "preparing"
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          updateOrderStatus(
                                            order.id,
                                            "preparing"
                                          )
                                        }
                                      >
                                        Preparing
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={
                                          order.status === "ready"
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          updateOrderStatus(order.id, "ready")
                                        }
                                      >
                                        Ready
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={
                                          order.status === "served"
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          updateOrderStatus(order.id, "served")
                                        }
                                      >
                                        Served
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={
                                          order.status === "cancelled"
                                            ? "destructive"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          updateOrderStatus(
                                            order.id,
                                            "cancelled"
                                          )
                                        }
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Menu Management</CardTitle>
                    <CardDescription>
                      Manage your restaurant menu items
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search menu items..."
                        className="pl-8 w-full sm:w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Menu Item</DialogTitle>
                          <DialogDescription>
                            Add a new item to your restaurant menu
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input id="name" placeholder="Enter item name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories
                                  .filter((c) => c !== "all")
                                  .map((category) => (
                                    <SelectItem key={category} value={category}>
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
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Enter item description"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Item</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="table-container">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMenuItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <UtensilsCrossed className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">
                              No menu items found
                            </p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredMenuItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.available ? "success" : "destructive"
                                }
                              >
                                {item.available ? "Available" : "Unavailable"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="icon">
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default RestaurantPage;
