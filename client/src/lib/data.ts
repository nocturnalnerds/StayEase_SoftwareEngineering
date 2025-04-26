import type { Customer, Room, RoomType, DiscountRate } from "./types";

// Mock room types
export const roomTypes: RoomType[] = [
  {
    id: 1,
    name: "Standard Room",
    description:
      "Comfortable room with essential amenities for a pleasant stay.",
    basePrice: 100,
    capacity: 2,
    maxOccupancy: 2,
    amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Private Bathroom"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and a beautiful view.",
    basePrice: 150,
    capacity: 2,
    maxOccupancy: 3,
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Mini Bar",
      "Coffee Maker",
      "Private Bathroom",
      "City View",
    ],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
  },
  {
    id: 3,
    name: "Executive Suite",
    description:
      "Luxurious suite with separate living area and premium amenities.",
    basePrice: 250,
    capacity: 2,
    maxOccupancy: 4,
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Mini Bar",
      "Coffee Maker",
      "Private Bathroom",
      "Living Room",
      "Ocean View",
      "Bathtub",
    ],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    id: 4,
    name: "Family Room",
    description: "Spacious room designed for families with children.",
    basePrice: 200,
    capacity: 4,
    maxOccupancy: 5,
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Mini Bar",
      "Coffee Maker",
      "Private Bathroom",
      "Garden View",
      "Extra Beds",
    ],
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    id: 5,
    name: "Presidential Suite",
    description:
      "Our most luxurious accommodation with premium services and amenities.",
    basePrice: 500,
    capacity: 2,
    maxOccupancy: 4,
    amenities: [
      "Free Wi-Fi",
      "TV",
      "Air Conditioning",
      "Mini Bar",
      "Coffee Maker",
      "Private Bathroom",
      "Living Room",
      "Ocean View",
      "Bathtub",
      "Private Butler",
      "Jacuzzi",
      "Dining Area",
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
  },
];

// Mock rooms
export const rooms: Room[] = [
  {
    id: 1,
    roomNumber: "101",
    roomType: roomTypes[0],
    floor: 1,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 2,
    roomNumber: "102",
    roomType: roomTypes[0],
    floor: 1,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 3,
    roomNumber: "201",
    roomType: roomTypes[1],
    floor: 2,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 4,
    roomNumber: "202",
    roomType: roomTypes[1],
    floor: 2,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 5,
    roomNumber: "301",
    roomType: roomTypes[2],
    floor: 3,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 6,
    roomNumber: "401",
    roomType: roomTypes[3],
    floor: 4,
    status: "Available",
    isSmoking: false,
  },
  {
    id: 7,
    roomNumber: "501",
    roomType: roomTypes[4],
    floor: 5,
    status: "Available",
    isSmoking: false,
  },
];

// Mock discount rates
export const discountRates: DiscountRate[] = [
  {
    id: 1,
    roomTypeId: 1,
    name: "Early Bird",
    ratePercentage: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 2,
    description: "Book at least 30 days in advance and get 10% off",
    isActive: true,
  },
  {
    id: 2,
    roomTypeId: 2,
    name: "Long Stay",
    ratePercentage: 15,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 5,
    description: "Stay 5 nights or more and get 15% off",
    isActive: true,
  },
  {
    id: 3,
    roomTypeId: 3,
    name: "Weekend Special",
    ratePercentage: 12,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 2,
    description: "Book for weekends and get 12% off",
    isActive: true,
  },
];

// Mock customer
export const currentCustomer: Customer = {
  id: 1,
  username: "johndoe",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  address: "123 Main St, Anytown",
  country: "United States",
  loyaltyPoints: 500,
};

// Helper functions
export const getAvailableRoomTypes = (
  checkInDate?: Date,
  checkOutDate?: Date,
  adults?: number,
  children?: number
) => {
  // In a real app, this would filter based on availability
  // For now, return all room types
  return roomTypes.filter((roomType) => {
    if (adults && children && adults + children > roomType.maxOccupancy) {
      return false;
    }
    return true;
  });
};

export const getAvailableRooms = (
  roomTypeId: number,
  checkInDate?: Date,
  checkOutDate?: Date
) => {
  // In a real app, this would check availability for specific dates
  // For now, return all rooms of the selected type
  return rooms.filter(
    (room) => room.roomType.id === roomTypeId && room.status === "Available"
  );
};

export const calculateTotalPrice = (
  roomTypeId: number,
  checkInDate: Date,
  checkOutDate: Date
) => {
  const roomType = roomTypes.find((rt) => rt.id === roomTypeId);
  if (!roomType) return 0;

  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check for applicable discounts
  const applicableDiscount = discountRates.find(
    (dr) =>
      dr.roomTypeId === roomTypeId && dr.isActive && nights >= dr.minNights
  );

  let totalPrice = roomType.basePrice * nights;

  if (applicableDiscount) {
    const discountAmount =
      totalPrice * (applicableDiscount.ratePercentage / 100);
    totalPrice -= discountAmount;
  }

  return totalPrice;
};
