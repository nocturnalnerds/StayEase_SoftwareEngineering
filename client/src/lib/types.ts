export type APIErrorResponse = {
  message: string;
  statusCode: number;
  status: string;
};

export type APISuccessResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
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

// Customer types
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
};

// Room types
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
  floor: number;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
  isSmoking: boolean;
  notes?: string;
};

export type DiscountRate = {
  id: number;
  roomTypeId: number;
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
  customerId: number;
  status: ReservationStatus;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  specialRequests?: string;
  totalAmount: number;
};

export type ReservationRoom = {
  id: number;
  reservationId: number;
  roomId: number;
  room: Room;
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
  notes?: string;
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
