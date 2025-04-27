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
import Layout from "@/components/staff/Layout";
import { foodItemData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import SkeletonCard from "@/components/staff/SkeletonCard";

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate("/settings")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">
              Food & Beverage Settings
            </h1>
          </div>

          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>
                  Create a new food or beverage item for the menu.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" placeholder="e.g. Caesar Salad" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="price"
                        type="number"
                        className="pl-8"
                        placeholder="12.99"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-secondary/20"
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
                    <Label htmlFor="prepTime">Preparation Time (min)</Label>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="prepTime"
                        type="number"
                        className="pl-8"
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the menu item..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ingredients">
                    Ingredients (comma separated)
                  </Label>
                  <Input
                    id="ingredients"
                    placeholder="Romaine Lettuce, Caesar Dressing, Croutons, Parmesan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergens">Allergens (comma separated)</Label>
                  <Input id="allergens" placeholder="Gluten, Dairy, Eggs" />
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
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
                  <Label htmlFor="image">Image</Label>
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
                <Button className="bg-primary hover:bg-primary/90">
                  Save Menu Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-secondary/20"
            />
          </div>
          <Button variant="outline" size="icon" className="border-secondary/20">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="menu-items" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="menu-items" className="space-y-6 mt-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="ml-2 h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <SkeletonCard key={index} hasImage={true} />
                  ))}
                </div>
              </div>
            ) : (
              Object.entries(foodItemsByCategory).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-primary">
                      {category}
                    </h2>
                    <Badge className="ml-2 bg-secondary/10 text-secondary border-none">
                      {items.length} items
                    </Badge>
                  </div>

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
                </div>
              ))
            )}

            {!isLoading && Object.keys(foodItemsByCategory).length === 0 && (
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
            <Card>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={index}
                          className="h-16 bg-gray-200 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-primary">
                        Menu Categories
                      </h2>
                      <Button className="bg-primary hover:bg-primary/90">
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
                        <Card key={category} className="border-secondary/10">
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FoodBeverageSettingsPage;
