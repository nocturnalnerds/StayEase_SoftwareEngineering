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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Save, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SkeletonCard from "@/components/staff/SkeletonCard";

interface SystemSettings {
  hotelName: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  taxRate: number;
  checkInTime: string;
  checkOutTime: string;
  enableNotifications: boolean;
  enableAutoCheckout: boolean;
  maintenanceMode: boolean;
  privacyPolicy: string;
  termsOfService: string;
}

const SystemSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    hotelName: "Grand Hotel",
    address: "123 Main Street, City, Country",
    phone: "+1 234 567 890",
    email: "info@grandhotel.com",
    currency: "USD",
    taxRate: 10,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    enableNotifications: true,
    enableAutoCheckout: false,
    maintenanceMode: false,
    privacyPolicy: "This is the privacy policy...",
    termsOfService: "These are the terms of service...",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (
    field: keyof SystemSettings,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard className="h-[400px]" />
            <SkeletonCard className="h-[400px]" />
            <SkeletonCard className="h-[300px]" />
            <SkeletonCard className="h-[300px]" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure your hotel system settings
          </p>
        </div>

        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription className="text-green-600">
              Settings have been saved successfully.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Information</CardTitle>
                  <CardDescription>
                    Basic information about your hotel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotelName">Hotel Name</Label>
                      <Input
                        id="hotelName"
                        value={settings.hotelName}
                        onChange={(e) =>
                          handleChange("hotelName", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={settings.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={settings.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Settings</CardTitle>
                  <CardDescription>
                    Configure currency and tax settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={settings.currency}
                        onValueChange={(value) =>
                          handleChange("currency", value)
                        }
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">
                            GBP - British Pound
                          </SelectItem>
                          <SelectItem value="JPY">
                            JPY - Japanese Yen
                          </SelectItem>
                          <SelectItem value="AUD">
                            AUD - Australian Dollar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={settings.taxRate.toString()}
                        onChange={(e) =>
                          handleChange(
                            "taxRate",
                            Number.parseFloat(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>
                    Configure system maintenance settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode" className="block mb-1">
                          Maintenance Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          When enabled, only administrators can access the
                          system
                        </p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          handleChange("maintenanceMode", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
                <CardDescription>
                  Configure check-in and check-out times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checkInTime">Check-in Time</Label>
                    <Input
                      id="checkInTime"
                      type="time"
                      value={settings.checkInTime}
                      onChange={(e) =>
                        handleChange("checkInTime", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOutTime">Check-out Time</Label>
                    <Input
                      id="checkOutTime"
                      type="time"
                      value={settings.checkOutTime}
                      onChange={(e) =>
                        handleChange("checkOutTime", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="enableAutoCheckout"
                        className="block mb-1"
                      >
                        Auto Check-out
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically check out guests at the specified
                        check-out time
                      </p>
                    </div>
                    <Switch
                      id="enableAutoCheckout"
                      checked={settings.enableAutoCheckout}
                      onCheckedChange={(checked) =>
                        handleChange("enableAutoCheckout", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="enableNotifications"
                        className="block mb-1"
                      >
                        Enable Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for bookings, check-ins, and
                        check-outs
                      </p>
                    </div>
                    <Switch
                      id="enableNotifications"
                      checked={settings.enableNotifications}
                      onCheckedChange={(checked) =>
                        handleChange("enableNotifications", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="notifyBooking" defaultChecked />
                        <Label htmlFor="notifyBooking">New Booking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notifyCheckIn" defaultChecked />
                        <Label htmlFor="notifyCheckIn">Guest Check-in</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notifyCheckOut" defaultChecked />
                        <Label htmlFor="notifyCheckOut">Guest Check-out</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notifyPayment" defaultChecked />
                        <Label htmlFor="notifyPayment">Payment Received</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>
                    Configure your hotel's privacy policy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px]"
                    value={settings.privacyPolicy}
                    onChange={(e) =>
                      handleChange("privacyPolicy", e.target.value)
                    }
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>
                    Configure your hotel's terms of service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px]"
                    value={settings.termsOfService}
                    onChange={(e) =>
                      handleChange("termsOfService", e.target.value)
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettingsPage;
