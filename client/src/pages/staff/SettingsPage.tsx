"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Hotel,
  UtensilsCrossed,
  PartyPopper,
  Package,
  CreditCard,
  Tag,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/staff/Layout";
import SkeletonCard from "@/components/staff/SkeletonCard";

interface SettingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const SettingsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
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

  const settingCards: SettingCardProps[] = [
    {
      title: "Room Settings",
      description: "Manage room types, amenities, and room numbers",
      icon: <Hotel className="h-6 w-6" />,
      path: "/settings/rooms",
    },
    {
      title: "Food & Beverage",
      description: "Configure menu items, prices, and categories",
      icon: <UtensilsCrossed className="h-6 w-6" />,
      path: "/settings/food-beverage",
    },
    {
      title: "Banquet Settings",
      description: "Set up banquet halls and event spaces",
      icon: <PartyPopper className="h-6 w-6" />,
      path: "/settings/banquet",
    },
    {
      title: "Inventory Settings",
      description: "Configure inventory categories and suppliers",
      icon: <Package className="h-6 w-6" />,
      path: "/settings/inventory",
    },
    {
      title: "Payment Settings",
      description: "Manage payment methods and transaction settings",
      icon: <CreditCard className="h-6 w-6" />,
      path: "/settings/payment",
    },
    {
      title: "Discount Rates",
      description: "Configure discount rates for room types",
      icon: <Tag className="h-6 w-6" />,
      path: "/settings/discount-rates",
    },
    {
      title: "System Settings",
      description: "General hotel information and system configuration",
      icon: <Settings className="h-6 w-6" />,
      path: "/settings/system",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Settings</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {settingCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={card.path} className="block h-full">
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 cursor-pointer border-secondary/10 hover:border-secondary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          {card.icon}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <CardTitle className="mt-4">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;
