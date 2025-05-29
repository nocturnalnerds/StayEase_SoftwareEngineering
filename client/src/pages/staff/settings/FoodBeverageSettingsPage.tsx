"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  UtensilsCrossed,
  Clock,
  DollarSign,
  ImageIcon,
  Tag,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { foodItemData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const FoodBeverageSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("menu-items");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
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

  const filteredFoodItems = foodItemData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group food items by category
  const foodItemsByCategory = filteredFoodItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof foodItemData>);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Food & Beverage Settings...
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
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate("/staff/settings")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-[#213555]">
                Food & Beverage Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage menu items, categories, and restaurant settings
              </p>
            </div>
          </div>

          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-[#213555] text-xl font-bold">
                  Add New Menu Item
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new food or beverage item for the menu.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-[#213555] font-medium"
                    >
                      Item Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Caesar Salad"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-[#213555] font-medium"
                    >
                      Price
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="price"
                        type="number"
                        className="pl-8 border-gray-200 focus:border-[#4F709C]"
                        placeholder="12.99"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-[#213555] font-medium"
                    >
                      Category
                    </Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="prepTime"
                      className="text-[#213555] font-medium"
                    >
                      Preparation Time (min)
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="prepTime"
                        type="number"
                        className="pl-8 border-gray-200 focus:border-[#4F709C]"
                        placeholder="15"
                      />
                    </div>
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
                    placeholder="Describe the menu item..."
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="ingredients"
                    className="text-[#213555] font-medium"
                  >
                    Ingredients (comma separated)
                  </Label>
                  <Input
                    id="ingredients"
                    placeholder="Romaine Lettuce, Caesar Dressing, Croutons, Parmesan"
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="allergens"
                    className="text-[#213555] font-medium"
                  >
                    Allergens (comma separated)
                  </Label>
                  <Input
                    id="allergens"
                    placeholder="Gluten, Dairy, Eggs"
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#213555] font-medium">
                    Availability
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isAvailable" defaultChecked />
                    <label
                      htmlFor="isAvailable"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Item is available for ordering
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#213555] font-medium">
                    Image
                  </Label>
                  <div className="border border-dashed border-secondary/20 rounded-md p-4 text-center cursor-pointer hover:bg-secondary/5 transition-colors">
                    <ImageIcon className="h-6 w-6 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddItemOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Save Menu Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Items
              </CardTitle>
              <UtensilsCrossed className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{foodItemData.length}</div>
              <p className="text-xs opacity-80 mt-1">Menu items</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Available
              </CardTitle>
              <UtensilsCrossed className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {foodItemData.filter((item) => item.isAvailable).length}
              </div>
              <p className="text-xs opacity-80 mt-1">Currently available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Categories
              </CardTitle>
              <Tag className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Object.keys(foodItemsByCategory).length}
              </div>
              <p className="text-xs opacity-80 mt-1">Menu categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Avg Price
              </CardTitle>
              <DollarSign className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                $
                {Math.round(
                  foodItemData.reduce((acc, item) => acc + item.price, 0) /
                    foodItemData.length
                )}
              </div>
              <p className="text-xs opacity-80 mt-1">Average price</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="menu-items" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
            <TabsTrigger
              value="menu-items"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Menu Items
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu-items" className="space-y-6 mt-6">
            {Object.entries(foodItemsByCategory).map(([category, items]) => (
              <Card
                key={category}
                className="shadow-lg border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    {category}
                    <Badge className="ml-2 bg-white/20 text-white border-none">
                      {items.length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {items.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Card className="overflow-hidden border-secondary/10 hover:shadow-md transition-shadow duration-300">
                          <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UtensilsCrossed className="h-12 w-12 text-gray-300" />
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">
                                {item.name}
                              </CardTitle>
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
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {item.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 text-secondary mr-1" />
                                  <span className="font-medium">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-secondary mr-1" />
                                  <span>{item.preparationTime} min</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {item.ingredients
                                  .slice(0, 3)
                                  .map((ingredient, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-secondary/5 border-secondary/20"
                                    >
                                      {ingredient}
                                    </Badge>
                                  ))}
                                {item.ingredients.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-secondary/5 border-secondary/20"
                                  >
                                    +{item.ingredients.length - 3} more
                                  </Badge>
                                )}
                              </div>

                              {item.allergens && item.allergens.length > 0 && (
                                <div className="pt-2 border-t border-secondary/10">
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">
                                      Allergens:
                                    </span>{" "}
                                    {item.allergens.join(", ")}
                                  </p>
                                </div>
                              )}

                              <div className="flex items-center">
                                <Badge
                                  className={
                                    item.isAvailable
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }
                                >
                                  {item.isAvailable
                                    ? "Available"
                                    : "Unavailable"}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            ))}

            {Object.keys(foodItemsByCategory).length === 0 && (
              <div className="text-center py-12">
                <UtensilsCrossed className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No menu items found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or add a new menu item.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Menu Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#213555]">
                      Menu Categories
                    </h2>
                    <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "Breakfast",
                      "Lunch",
                      "Dinner",
                      "Dessert",
                      "Beverage",
                      "Snack",
                    ].map((category) => (
                      <Card
                        key={category}
                        className="border-secondary/10 hover:shadow-md transition-shadow duration-300"
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                              <Tag className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{category}</span>
                          </div>
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
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FoodBeverageSettingsPage;
