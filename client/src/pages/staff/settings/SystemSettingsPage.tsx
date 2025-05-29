"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Download,
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Database,
  Bell,
  Monitor,
  Smartphone,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SystemSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

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

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading System Settings...
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
                System Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Configure hotel information and system preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Settings
            </Button>
            <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                System Status
              </CardTitle>
              <Monitor className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Online</div>
              <p className="text-xs opacity-80 mt-1">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Security
              </CardTitle>
              <Shield className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Secure</div>
              <p className="text-xs opacity-80 mt-1">
                All security features active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Integrations
              </CardTitle>
              <Database className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs opacity-80 mt-1">Active connections</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Notifications
              </CardTitle>
              <Bell className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Enabled</div>
              <p className="text-xs opacity-80 mt-1">All alerts active</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="general"
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Database className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Hotel Information */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Hotel Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="hotelName"
                          className="text-[#213555] font-medium"
                        >
                          Hotel Name
                        </Label>
                        <Input
                          id="hotelName"
                          defaultValue="Grand Hotel Management"
                          className="border-gray-200 focus:border-[#4F709C]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="hotelCode"
                          className="text-[#213555] font-medium"
                        >
                          Hotel Code
                        </Label>
                        <Input
                          id="hotelCode"
                          defaultValue="GHM001"
                          className="border-gray-200 focus:border-[#4F709C]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-[#213555] font-medium"
                      >
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Hotel Street, Downtown District, City 12345"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-[#213555] font-medium"
                        >
                          <Phone className="inline h-4 w-4 mr-1" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          defaultValue="+1 (555) 123-4567"
                          className="border-gray-200 focus:border-[#4F709C]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-[#213555] font-medium"
                        >
                          <Mail className="inline h-4 w-4 mr-1" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="info@grandhotel.com"
                          className="border-gray-200 focus:border-[#4F709C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="timezone"
                          className="text-[#213555] font-medium"
                        >
                          <Clock className="inline h-4 w-4 mr-1" />
                          Timezone
                        </Label>
                        <select
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                        >
                          <option value="UTC-5">Eastern Time (UTC-5)</option>
                          <option value="UTC-6">Central Time (UTC-6)</option>
                          <option value="UTC-7">Mountain Time (UTC-7)</option>
                          <option value="UTC-8">Pacific Time (UTC-8)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="currency"
                          className="text-[#213555] font-medium"
                        >
                          <DollarSign className="inline h-4 w-4 mr-1" />
                          Default Currency
                        </Label>
                        <select
                          id="currency"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* System Preferences */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      System Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Dark Mode
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable dark theme for the interface
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Auto Backup
                            </Label>
                            <p className="text-sm text-gray-500">
                              Automatically backup data daily
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Maintenance Mode
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable maintenance mode
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Guest WiFi
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable guest WiFi access
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Mobile App
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable mobile app integration
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-[#213555] font-medium">
                              Analytics
                            </Label>
                            <p className="text-sm text-gray-500">
                              Enable usage analytics
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#213555]">
                          Email Notifications
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                New Bookings
                              </Label>
                              <p className="text-sm text-gray-500">
                                Notify when new bookings are made
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Payment Alerts
                              </Label>
                              <p className="text-sm text-gray-500">
                                Notify on payment transactions
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                System Updates
                              </Label>
                              <p className="text-sm text-gray-500">
                                Notify about system updates
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#213555]">
                          SMS Notifications
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Booking Confirmations
                              </Label>
                              <p className="text-sm text-gray-500">
                                Send SMS confirmations to guests
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Check-in Reminders
                              </Label>
                              <p className="text-sm text-gray-500">
                                Send check-in reminders
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Emergency Alerts
                              </Label>
                              <p className="text-sm text-gray-500">
                                Send emergency notifications
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#213555]">
                          Authentication
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Two-Factor Authentication
                              </Label>
                              <p className="text-sm text-gray-500">
                                Require 2FA for all staff accounts
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Session Timeout
                              </Label>
                              <p className="text-sm text-gray-500">
                                Auto-logout after inactivity
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label
                              htmlFor="sessionTimeout"
                              className="text-[#213555] font-medium"
                            >
                              Session Duration (minutes)
                            </Label>
                            <Input
                              id="sessionTimeout"
                              type="number"
                              defaultValue="30"
                              className="border-gray-200 focus:border-[#4F709C]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#213555]">
                          Data Protection
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Data Encryption
                              </Label>
                              <p className="text-sm text-gray-500">
                                Encrypt sensitive data
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Audit Logging
                              </Label>
                              <p className="text-sm text-gray-500">
                                Log all system activities
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-[#213555] font-medium">
                                Backup Encryption
                              </Label>
                              <p className="text-sm text-gray-500">
                                Encrypt backup files
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4">
                      {[
                        {
                          name: "Payment Gateway",
                          description: "Stripe payment processing",
                          status: "Connected",
                          icon: DollarSign,
                          color: "green",
                        },
                        {
                          name: "Email Service",
                          description: "SendGrid email delivery",
                          status: "Connected",
                          icon: Mail,
                          color: "green",
                        },
                        {
                          name: "SMS Service",
                          description: "Twilio SMS notifications",
                          status: "Disconnected",
                          icon: Smartphone,
                          color: "red",
                        },
                        {
                          name: "Analytics",
                          description: "Google Analytics tracking",
                          status: "Connected",
                          icon: Monitor,
                          color: "green",
                        },
                        {
                          name: "Cloud Storage",
                          description: "AWS S3 file storage",
                          status: "Connected",
                          icon: Database,
                          color: "green",
                        },
                        {
                          name: "Security Camera",
                          description: "CCTV system integration",
                          status: "Disconnected",
                          icon: Camera,
                          color: "red",
                        },
                      ].map((integration, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <integration.icon className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-[#213555]">
                                {integration.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {integration.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                integration.color === "green"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {integration.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              {integration.status === "Connected"
                                ? "Configure"
                                : "Connect"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
