"use client";

import { Textarea } from "@/components/ui/textarea";

import type React from "react";
import { useState, useEffect } from "react";
import Layout from "@/components/staff/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertTriangle,
  Package,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import SkeletonTable from "@/components/staff/SkeletonTable";
import SkeletonStats from "@/components/staff/SkeletonStats";
import SkeletonChart from "@/components/staff/SkeletonChart";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minLevel: number;
  maxLevel: number;
  supplier: string;
  lastRestocked: string;
  price: number;
}

const InventoryPage: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setInventoryItems([
        {
          id: "INV-001",
          name: "Bath Towels",
          category: "Linens",
          quantity: 120,
          unit: "pcs",
          minLevel: 50,
          maxLevel: 200,
          supplier: "Luxury Linens Co.",
          lastRestocked: "2023-04-15",
          price: 12.99,
        },
        {
          id: "INV-002",
          name: "Hand Soap",
          category: "Toiletries",
          quantity: 85,
          unit: "bottles",
          minLevel: 30,
          maxLevel: 100,
          supplier: "Clean Supplies Inc.",
          lastRestocked: "2023-04-10",
          price: 3.99,
        },
        {
          id: "INV-003",
          name: "Coffee Pods",
          category: "Food & Beverage",
          quantity: 25,
          unit: "boxes",
          minLevel: 20,
          maxLevel: 50,
          supplier: "Gourmet Coffee Co.",
          lastRestocked: "2023-04-05",
          price: 24.99,
        },
        {
          id: "INV-004",
          name: "Bed Sheets",
          category: "Linens",
          quantity: 80,
          unit: "sets",
          minLevel: 40,
          maxLevel: 120,
          supplier: "Luxury Linens Co.",
          lastRestocked: "2023-04-12",
          price: 34.99,
        },
        {
          id: "INV-005",
          name: "Shampoo",
          category: "Toiletries",
          quantity: 150,
          unit: "bottles",
          minLevel: 50,
          maxLevel: 200,
          supplier: "Clean Supplies Inc.",
          lastRestocked: "2023-04-08",
          price: 2.99,
        },
        {
          id: "INV-006",
          name: "Toilet Paper",
          category: "Toiletries",
          quantity: 15,
          unit: "packs",
          minLevel: 20,
          maxLevel: 60,
          supplier: "Clean Supplies Inc.",
          lastRestocked: "2023-04-02",
          price: 18.99,
        },
        {
          id: "INV-007",
          name: "Wine Glasses",
          category: "Kitchenware",
          quantity: 60,
          unit: "pcs",
          minLevel: 30,
          maxLevel: 80,
          supplier: "Hotel Supplies Ltd.",
          lastRestocked: "2023-04-14",
          price: 8.99,
        },
        {
          id: "INV-008",
          name: "Bottled Water",
          category: "Food & Beverage",
          quantity: 200,
          unit: "bottles",
          minLevel: 100,
          maxLevel: 300,
          supplier: "Beverage Distributors",
          lastRestocked: "2023-04-16",
          price: 1.49,
        },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(inventoryItems.map((item) => item.category))),
  ];

  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity <= item.minLevel
  );

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxLevel) * 100;
    if (item.quantity <= item.minLevel) return "low";
    if (percentage > 80) return "high";
    return "normal";
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-red-500";
      case "normal":
        return "bg-blue-500";
      case "high":
        return "bg-green-500";
      default:
        return "bg-blue-500";
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
            <SkeletonTable rowCount={5} columnCount={4} />
            <SkeletonChart height={300} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage hotel inventory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="h-6 w-6 text-blue-500 mr-2" />
                <div className="text-3xl font-bold">
                  {inventoryItems.length}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                <div className="text-3xl font-bold">{lowStockItems.length}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-green-500 mr-2" />
                <div className="text-3xl font-bold">
                  $
                  {inventoryItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Inventory Items</CardTitle>
                    <CardDescription>
                      Manage your hotel inventory
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search items..."
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
                          <DialogTitle>Add Inventory Item</DialogTitle>
                          <DialogDescription>
                            Add a new item to your inventory
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
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
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="quantity">Quantity</Label>
                              <Input
                                id="quantity"
                                type="number"
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="unit">Unit</Label>
                              <Input
                                id="unit"
                                placeholder="pcs, bottles, etc."
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="minLevel">Min Level</Label>
                              <Input
                                id="minLevel"
                                type="number"
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="maxLevel">Max Level</Label>
                              <Input
                                id="maxLevel"
                                type="number"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="supplier">Supplier</Label>
                              <Input
                                id="supplier"
                                placeholder="Enter supplier name"
                              />
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
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Stock Level</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => {
                        const stockStatus = getStockStatus(item);
                        const progressColor = getProgressColor(stockStatus);
                        const progressPercentage = Math.min(
                          100,
                          (item.quantity / item.maxLevel) * 100
                        );

                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.id}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              <div className="w-full">
                                <div className="flex justify-between mb-1 text-xs">
                                  <span>
                                    {stockStatus === "low"
                                      ? "Low"
                                      : stockStatus === "high"
                                      ? "High"
                                      : "Normal"}
                                  </span>
                                  <span>{progressPercentage.toFixed(0)}%</span>
                                </div>
                                <Progress
                                  value={progressPercentage}
                                  className={progressColor}
                                />
                              </div>
                            </TableCell>
                            <TableCell>{item.supplier}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Edit Inventory Item
                                      </DialogTitle>
                                      <DialogDescription>
                                        Update inventory item details
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-name">
                                            Item Name
                                          </Label>
                                          <Input
                                            id="edit-name"
                                            defaultValue={item.name}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-category">
                                            Category
                                          </Label>
                                          <Select defaultValue={item.category}>
                                            <SelectTrigger id="edit-category">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-quantity">
                                            Quantity
                                          </Label>
                                          <Input
                                            id="edit-quantity"
                                            type="number"
                                            defaultValue={item.quantity}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-unit">
                                            Unit
                                          </Label>
                                          <Input
                                            id="edit-unit"
                                            defaultValue={item.unit}
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-minLevel">
                                            Min Level
                                          </Label>
                                          <Input
                                            id="edit-minLevel"
                                            type="number"
                                            defaultValue={item.minLevel}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-maxLevel">
                                            Max Level
                                          </Label>
                                          <Input
                                            id="edit-maxLevel"
                                            type="number"
                                            defaultValue={item.maxLevel}
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-supplier">
                                            Supplier
                                          </Label>
                                          <Input
                                            id="edit-supplier"
                                            defaultValue={item.supplier}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-price">
                                            Price ($)
                                          </Label>
                                          <Input
                                            id="edit-price"
                                            type="number"
                                            step="0.01"
                                            defaultValue={item.price}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit">
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <RefreshCw className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Restock Item</DialogTitle>
                                      <DialogDescription>
                                        Add inventory to {item.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="restock-quantity">
                                          Quantity to Add
                                        </Label>
                                        <Input
                                          id="restock-quantity"
                                          type="number"
                                          placeholder="0"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="restock-date">
                                          Restock Date
                                        </Label>
                                        <Input
                                          id="restock-date"
                                          type="date"
                                          defaultValue={
                                            new Date()
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="restock-notes">
                                          Notes
                                        </Label>
                                        <Textarea
                                          id="restock-notes"
                                          placeholder="Add any notes about this restock"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit">
                                        Confirm Restock
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="low-stock">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>
                  Items that need to be restocked soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lowStockItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Low Stock Items</h3>
                    <p className="text-muted-foreground">
                      All inventory items are at adequate levels
                    </p>
                  </div>
                ) : (
                  <div className="table-container">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Current Quantity</TableHead>
                          <TableHead>Min Level</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.id}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell className="text-red-500 font-medium">
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              {item.minLevel} {item.unit}
                            </TableCell>
                            <TableCell>{item.supplier}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>Restock</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Restock {item.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Add inventory to this low stock item
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`restock-${item.id}-quantity`}
                                      >
                                        Quantity to Add
                                      </Label>
                                      <Input
                                        id={`restock-${item.id}-quantity`}
                                        type="number"
                                        placeholder="0"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`restock-${item.id}-date`}
                                      >
                                        Restock Date
                                      </Label>
                                      <Input
                                        id={`restock-${item.id}-date`}
                                        type="date"
                                        defaultValue={
                                          new Date().toISOString().split("T")[0]
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`restock-${item.id}-notes`}
                                      >
                                        Notes
                                      </Label>
                                      <Textarea
                                        id={`restock-${item.id}-notes`}
                                        placeholder="Add any notes about this restock"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">
                                      Confirm Restock
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default InventoryPage;
