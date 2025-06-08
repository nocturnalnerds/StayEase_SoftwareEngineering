export type APIErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
};

export type APISuccessResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
  [key: string]: any;
};

export type RoomCardProps = {
  id?: string;
  image: string;
  roomType: string;
  price: number;
  beds: number;
  maxGuests: number;
  maxBreakfasts: number;
};

export type User = {
  id?: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  role: string;
};

export type Admin = {
  id?: string;
  email: string;
  password: string;
};

export type ContactProps = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

// All types based on the ERD

// User types
export type Role =
  | "Admin"
  | "Manager"
  | "Receptionist"
  | "Housekeeper"
  | "Chef"
  | "Maintenance"
  | "Cashier";

export type Department =
  | "Management"
  | "Front Office"
  | "Housekeeping"
  | "Food & Beverage"
  | "Maintenance"
  | "Finance";

export type Division =
  | "Administration"
  | "Operations"
  | "Customer Service"
  | "Technical"
  | "Culinary";

export type Staff = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  department: Department;
  hireDate: string;
  status: "Active" | "Inactive" | "On Leave";
  salary: number;
};

export type Customer = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  country: string;
  loyaltyPoints: number;
  registrationDate: string;
  status: "Active" | "Inactive" | "Blacklisted";
  lastVisit?: string;
  profileImage?: string;
};

// Room types
export type RoomStatus =
  | "Available"
  | "Occupied"
  | "Cleaning"
  | "Maintenance"
  | "Out of Order"
  | "Reserved";

export type RoomType = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  maxOccupancy: number;
  amenities: string[];
  images: string[];
};

export type Room = {
  id: number;
  roomNumber: string;
  roomType: RoomType;
  roomTypeId: number;
  floor: number;
  status: RoomStatus;
  notes?: string;
  lastCleaned?: string;
  currentOccupant?: number;
};

export type HouseKeeperRoom = {
  id: number;
  roomNumber: string;
  type: string;
  status: RoomStatus;
  lastCleaned: string;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  notes?: string;
};

export type DiscountRate = {
  id: number;
  roomTypeId: number;
  roomType: RoomType;
  name: string;
  ratePercentage: number;
  startDate: string;
  endDate: string;
  minNights: number;
  description: string;
  isActive: boolean;
};

// Reservation types
export type ReservationStatus =
  | "Confirmed"
  | "Checked-in"
  | "Checked-out"
  | "No-show"
  | "Cancelled"
  | "Draft";

export type Reservation = {
  id: number;
  reservationNumber: string;
  customer: Customer;
  status: ReservationStatus;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  specialRequests?: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  assignedRooms: ReservationRoom[];
  payments?: Payment[];
  paymentStatus: PaymentStatus;
};

export type ReservationRoom = {
  id: number;
  reservationId: number;
  room: Room;
  roomId: number;
  ratePerNight: number;
  discountId?: number;
  discount?: DiscountRate;
  checkInDate: string;
  checkOutDate: string;
};

// Payment types
export type PaymentMethod =
  | "Credit Card"
  | "Debit Card"
  | "Cash"
  | "Bank Transfer"
  | "PayPal";

export type PaymentStatus = "Pending" | "Completed" | "Failed" | "Refunded";

export type Payment = {
  id: number;
  reservationId: number;
  paymentNumber: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paymentDate: string;
  processedBy?: Staff;
  notes?: string;
  reservation?: Reservation;
};

// Food & Beverage types
export type FoodCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Dessert"
  | "Beverage"
  | "Snack";

export type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  isAvailable: boolean;
  image?: string;
  ingredients: string[];
  allergens?: string[];
  preparationTime: number; // in minutes
};

export type FoodOrder = {
  id: number;
  orderNumber: string;
  roomId?: number;
  room?: Room;
  customerId?: number;
  customer?: Customer;
  items: FoodOrderItem[];
  totalAmount: number;
  orderDate: string;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  notes?: string;
  preparedBy?: Staff;
};

export type FoodOrderItem = {
  id: number;
  orderId: number;
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
  price: number;
};

// Banquet types
export type BanquetHall = {
  id: number;
  name: string;
  capacity: number;
  pricePerHour: number;
  description: string;
  images: string[];
  amenities: string[];
  isAvailable: boolean;
};

export type BanquetBooking = {
  id: number;
  bookingNumber: string;
  hall: BanquetHall;
  customerId: number;
  customer: Customer;
  eventType: string;
  startDateTime: string;
  endDateTime: string;
  attendees: number;
  totalAmount: number;
  status: "Confirmed" | "Cancelled" | "Completed";
  notes?: string;
};

// Inventory types
export type InventoryCategory =
  | "Cleaning"
  | "Toiletries"
  | "Linen"
  | "Food"
  | "Beverage"
  | "Maintenance"
  | "Office";

export type InventoryItem = {
  id: number;
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: string;
  reorderLevel: number;
  cost: number;
  supplier: string;
  lastRestocked: string;
  location: string;
};

export type InventoryTransaction = {
  id: number;
  itemId: number;
  item: InventoryItem;
  quantity: number;
  transactionType: "In" | "Out";
  date: string;
  staffId: number;
  staff: Staff;
  notes?: string;
};

// Dashboard types
export type DashboardStats = {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  pendingReservations: number;
  monthlyRevenue: number;
  occupancyRate: number;
};

export type RevenueData = {
  date: string;
  amount: number;
};

export type OccupancyData = {
  date: string;
  rate: number;
};

// Settings types
export type SystemSettings = {
  hotelName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
  taxRate: number;
  logo?: string;
};

// Report types
export type ReportType =
  | "Occupancy"
  | "Revenue"
  | "Inventory"
  | "Staff"
  | "Customer"
  | "Food";

export type ReportTimeframe =
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly"
  | "Custom";

export type Report = {
  id: number;
  name: string;
  type: ReportType;
  timeframe: ReportTimeframe;
  startDate: string;
  endDate: string;
  generatedBy: Staff;
  generatedAt: string;
  data: unknown;
  format: "PDF" | "Excel" | "CSV";
};

// Booking form types
export type BookingFormData = {
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  roomTypeId: number;
  specialRequests?: string;
};

// Filter types for offers page
export type RoomFilter = {
  checkInDate?: Date;
  checkOutDate?: Date;
  adults?: number;
  children?: number;
  priceRange?: [number, number];
  amenities?: string[];
};

export type Booking = {
  bookingId: string;
  guestName: string;
  roomNumber: number;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  status: "checked-in" | "checked-out" | "confirmed" | "cancelled";
};
