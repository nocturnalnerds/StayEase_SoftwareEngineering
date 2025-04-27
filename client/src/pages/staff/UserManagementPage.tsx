"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, UserCircle, ShieldCheck, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/staff/Layout";
import SkeletonCard from "@/components/staff/SkeletonCard";

interface UserManagementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count: number;
}

const UserManagementPage: React.FC = () => {
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

  const userManagementCards: UserManagementCardProps[] = [
    {
      title: "Staff Management",
      description: "Manage hotel staff, roles, and permissions",
      icon: <Users className="h-6 w-6" />,
      path: "/user-management/staff",
      count: 7,
    },
    {
      title: "Customer Management",
      description: "View and manage customer accounts and profiles",
      icon: <UserCircle className="h-6 w-6" />,
      path: "/user-management/customers",
      count: 5,
    },
    {
      title: "Roles & Permissions",
      description: "Configure user roles and access permissions",
      icon: <ShieldCheck className="h-6 w-6" />,
      path: "/user-management/roles",
      count: 6,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">User Management</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {userManagementCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={card.path} className="block h-full">
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 cursor-pointer border-secondary/10 hover:border-secondary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          {card.icon}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-medium">
                          {card.count}
                        </div>
                      </div>
                      <CardTitle className="mt-4">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-end">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
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

export default UserManagementPage;
