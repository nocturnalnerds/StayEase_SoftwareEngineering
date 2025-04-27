"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, CalendarCheck, CalendarX, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/staff/Layout";
import { reservationData } from "@/lib/data";
import SkeletonCard from "@/components/staff/SkeletonCard";

interface FrontOfficeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count: number;
  color: string;
}

const FrontOfficePage: React.FC = () => {
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

  // Count reservations by status
  const confirmedCount = reservationData.filter(
    (res) => res.status === "Confirmed"
  ).length;
  const checkedInCount = reservationData.filter(
    (res) => res.status === "Checked-in"
  ).length;
  const checkedOutCount = reservationData.filter(
    (res) => res.status === "Checked-out"
  ).length;

  const frontOfficeCards: FrontOfficeCardProps[] = [
    {
      title: "Reservations",
      description: "Manage all reservations and booking details",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/front-office/reservations",
      count: confirmedCount,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Check-in",
      description: "Process guest arrivals and room assignments",
      icon: <CalendarCheck className="h-6 w-6" />,
      path: "/front-office/check-in",
      count: checkedInCount,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Check-out",
      description: "Process guest departures and payments",
      icon: <CalendarX className="h-6 w-6" />,
      path: "/front-office/check-out",
      count: checkedOutCount,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Front Office</h1>
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
            {frontOfficeCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={card.path} className="block h-full">
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 cursor-pointer border-secondary/10 hover:border-secondary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          {card.icon}
                        </div>
                        <div
                          className={`h-8 px-2 rounded-full ${card.color} flex items-center justify-center font-medium text-sm`}
                        >
                          {card.count}{" "}
                          {card.title === "Reservations"
                            ? "pending"
                            : card.title === "Check-in"
                            ? "today"
                            : "processed"}
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

export default FrontOfficePage;
