import type {
  Staff,
  Customer,
  RoomType,
  Room,
  DiscountRate,
  Reservation,
  FoodItem,
  FoodOrder,
  BanquetHall,
  InventoryItem,
  DashboardStats,
  RevenueData,
  OccupancyData,
  SystemSettings,
  HouseKeeperRoom,
} from "@/lib/types";

// Mock staff data
export const staffData: Staff[] = [
  {
    id: 1,
    username: "john.admin",
    email: "john.admin@hotel.com",
    firstName: "John",
    lastName: "Smith",
    phone: "+1234567890",
    role: "Admin",
    department: "Management",
    division: "Administration",
    hireDate: "2020-01-15",
    status: "Active",
    lastLogin: "2023-06-15T08:30:00",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    username: "sarah.manager",
    email: "sarah.manager@hotel.com",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+1234567891",
    role: "Manager",
    department: "Front Office",
    division: "Operations",
    hireDate: "2020-03-10",
    status: "Active",
    lastLogin: "2023-06-14T17:45:00",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    username: "mike.receptionist",
    email: "mike.receptionist@hotel.com",
    firstName: "Mike",
    lastName: "Brown",
    phone: "+1234567892",
    role: "Receptionist",
    department: "Front Office",
    division: "Customer Service",
    hireDate: "2021-05-20",
    status: "Active",
    lastLogin: "2023-06-15T09:15:00",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    username: "lisa.housekeeper",
    email: "lisa.housekeeper@hotel.com",
    firstName: "Lisa",
    lastName: "Davis",
    phone: "+1234567893",
    role: "Housekeeper",
    department: "Housekeeping",
    division: "Operations",
    hireDate: "2021-02-15",
    status: "Active",
    lastLogin: "2023-06-15T07:30:00",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    username: "david.chef",
    email: "david.chef@hotel.com",
    firstName: "David",
    lastName: "Wilson",
    phone: "+1234567894",
    role: "Chef",
    department: "Food & Beverage",
    division: "Culinary",
    hireDate: "2020-11-05",
    status: "Active",
    lastLogin: "2023-06-15T06:45:00",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    username: "emma.cashier",
    email: "emma.cashier@hotel.com",
    firstName: "Emma",
    lastName: "Taylor",
    phone: "+1234567895",
    role: "Cashier",
    department: "Finance",
    division: "Administration",
    hireDate: "2022-01-10",
    status: "Active",
    lastLogin: "2023-06-15T08:00:00",
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    username: "robert.maintenance",
    email: "robert.maintenance@hotel.com",
    firstName: "Robert",
    lastName: "Anderson",
    phone: "+1234567896",
    role: "Maintenance",
    department: "Maintenance",
    division: "Technical",
    hireDate: "2021-07-22",
    status: "Active",
    lastLogin: "2023-06-14T16:30:00",
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

// Mock customer data
export const customerData: Customer[] = [
  {
    id: 1,
    username: "alice.customer",
    email: "alice@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    phone: "+1987654321",
    address: "123 Main St, Anytown",
    country: "United States",
    loyaltyPoints: 500,
    registrationDate: "2022-01-15",
    status: "Active",
    lastVisit: "2023-05-20",
    profileImage: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 2,
    username: "bob.customer",
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Smith",
    phone: "+1987654322",
    address: "456 Oak Ave, Somewhere",
    country: "Canada",
    loyaltyPoints: 750,
    registrationDate: "2022-02-20",
    status: "Active",
    lastVisit: "2023-06-01",
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    username: "carol.customer",
    email: "carol@example.com",
    firstName: "Carol",
    lastName: "Williams",
    phone: "+1987654323",
    address: "789 Pine Rd, Elsewhere",
    country: "United Kingdom",
    loyaltyPoints: 300,
    registrationDate: "2022-03-10",
    status: "Active",
    lastVisit: "2023-06-10",
    profileImage: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    id: 4,
    username: "dave.customer",
    email: "dave@example.com",
    firstName: "Dave",
    lastName: "Brown",
    phone: "+1987654324",
    address: "101 Elm St, Nowhere",
    country: "Australia",
    loyaltyPoints: 1000,
    registrationDate: "2021-12-05",
    status: "Active",
    lastVisit: "2023-05-15",
    profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: 5,
    username: "eve.customer",
    email: "eve@example.com",
    firstName: "Eve",
    lastName: "Davis",
    phone: "+1987654325",
    address: "202 Maple Ave, Anywhere",
    country: "Germany",
    loyaltyPoints: 150,
    registrationDate: "2022-04-25",
    status: "Inactive",
    lastVisit: "2023-04-10",
    profileImage: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];

// Mock room types
export const roomTypeData: RoomType[] = [
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
export const roomData: Room[] = [
  {
    id: 1,
    roomNumber: "101",
    roomType: roomTypeData[0],
    floor: 1,
    status: "Available",
    lastCleaned: "2023-06-14T10:30:00",
  },
  {
    id: 2,
    roomNumber: "102",
    roomType: roomTypeData[0],
    floor: 1,
    status: "Occupied",
    lastCleaned: "2023-06-13T11:15:00",
    currentOccupant: 1,
  },
  {
    id: 3,
    roomNumber: "103",
    roomType: roomTypeData[0],
    floor: 1,
    status: "Cleaning",
    lastCleaned: "2023-06-15T08:45:00",
  },
  {
    id: 4,
    roomNumber: "201",
    roomType: roomTypeData[1],
    floor: 2,
    status: "Available",
    lastCleaned: "2023-06-14T09:20:00",
  },
  {
    id: 5,
    roomNumber: "202",
    roomType: roomTypeData[1],
    floor: 2,
    status: "Occupied",
    lastCleaned: "2023-06-12T10:00:00",
    currentOccupant: 2,
  },
  {
    id: 6,
    roomNumber: "301",
    roomType: roomTypeData[2],
    floor: 3,
    status: "Available",
    lastCleaned: "2023-06-14T14:30:00",
  },
  {
    id: 7,
    roomNumber: "302",
    roomType: roomTypeData[2],
    floor: 3,
    status: "Maintenance",
    notes: "Fixing air conditioning unit",
    lastCleaned: "2023-06-10T11:45:00",
  },
  {
    id: 8,
    roomNumber: "401",
    roomType: roomTypeData[3],
    floor: 4,
    status: "Available",
    lastCleaned: "2023-06-14T15:10:00",
  },
  {
    id: 9,
    roomNumber: "402",
    roomType: roomTypeData[3],
    floor: 4,
    status: "Reserved",
    lastCleaned: "2023-06-13T16:20:00",
  },
  {
    id: 10,
    roomNumber: "501",
    roomType: roomTypeData[4],
    floor: 5,
    status: "Occupied",
    lastCleaned: "2023-06-11T09:30:00",
    currentOccupant: 3,
  },
];

// Mock discount rates
export const discountRateData: DiscountRate[] = [
  {
    id: 1,
    roomTypeId: 1,
    roomType: roomTypeData[0],
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
    roomType: roomTypeData[1],
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
    roomType: roomTypeData[2],
    name: "Weekend Special",
    ratePercentage: 12,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 2,
    description: "Book for weekends and get 12% off",
    isActive: true,
  },
  {
    id: 4,
    roomTypeId: 4,
    roomType: roomTypeData[3],
    name: "Family Package",
    ratePercentage: 20,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    minNights: 3,
    description: "Summer family discount for 3+ nights",
    isActive: true,
  },
  {
    id: 5,
    roomTypeId: 5,
    roomType: roomTypeData[4],
    name: "Luxury Experience",
    ratePercentage: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 2,
    description: "Exclusive discount for our premium suite",
    isActive: true,
  },
];

// Mock reservations
export const reservationData: Reservation[] = [
  {
    id: 1,
    reservationNumber: "RES-2023-001",
    customer: customerData[0],
    status: "Confirmed",
    checkInDate: "2023-06-20",
    checkOutDate: "2023-06-25",
    adults: 2,
    children: 0,
    specialRequests: "High floor room preferred",
    totalAmount: 750,
    createdAt: "2023-06-01T14:30:00",
    updatedAt: "2023-06-01T14:30:00",
    assignedRooms: [
      {
        id: 1,
        reservationId: 1,
        room: roomData[3],
        ratePerNight: 150,
        checkInDate: "2023-06-20",
        checkOutDate: "2023-06-25",
      },
    ],
    payments: [
      {
        id: 1,
        reservationId: 1,
        paymentNumber: "PAY-2023-001",
        amount: 750,
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        transactionId: "TXN123456",
        paymentDate: "2023-06-01T14:35:00",
        processedBy: staffData[5],
      },
    ],
  },
  {
    id: 2,
    reservationNumber: "RES-2023-002",
    customer: customerData[1],
    status: "Checked-in",
    checkInDate: "2023-06-15",
    checkOutDate: "2023-06-18",
    adults: 2,
    children: 1,
    totalAmount: 600,
    createdAt: "2023-05-20T10:15:00",
    updatedAt: "2023-06-15T14:00:00",
    assignedRooms: [
      {
        id: 2,
        reservationId: 2,
        room: roomData[4],
        ratePerNight: 150,
        discountId: 2,
        discount: discountRateData[1],
        checkInDate: "2023-06-15",
        checkOutDate: "2023-06-18",
      },
    ],
    payments: [
      {
        id: 2,
        reservationId: 2,
        paymentNumber: "PAY-2023-002",
        amount: 600,
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        transactionId: "TXN123457",
        paymentDate: "2023-05-20T10:20:00",
        processedBy: staffData[5],
      },
    ],
  },
  {
    id: 3,
    reservationNumber: "RES-2023-003",
    customer: customerData[2],
    status: "Confirmed",
    checkInDate: "2023-06-25",
    checkOutDate: "2023-06-30",
    adults: 1,
    children: 0,
    totalAmount: 500,
    createdAt: "2023-06-10T16:45:00",
    updatedAt: "2023-06-10T16:45:00",
    assignedRooms: [
      {
        id: 3,
        reservationId: 3,
        room: roomData[0],
        ratePerNight: 100,
        checkInDate: "2023-06-25",
        checkOutDate: "2023-06-30",
      },
    ],
    payments: [
      {
        id: 3,
        reservationId: 3,
        paymentNumber: "PAY-2023-003",
        amount: 250,
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        transactionId: "TXN123458",
        paymentDate: "2023-06-10T16:50:00",
        processedBy: staffData[5],
      },
    ],
  },
  {
    id: 4,
    reservationNumber: "RES-2023-004",
    customer: customerData[3],
    status: "Checked-out",
    checkInDate: "2023-06-10",
    checkOutDate: "2023-06-15",
    adults: 2,
    children: 2,
    specialRequests: "Need extra towels and baby crib",
    totalAmount: 1000,
    createdAt: "2023-05-15T09:30:00",
    updatedAt: "2023-06-15T11:00:00",
    assignedRooms: [
      {
        id: 4,
        reservationId: 4,
        room: roomData[7],
        ratePerNight: 200,
        checkInDate: "2023-06-10",
        checkOutDate: "2023-06-15",
      },
    ],
    payments: [
      {
        id: 4,
        reservationId: 4,
        paymentNumber: "PAY-2023-004",
        amount: 1000,
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        transactionId: "TXN123459",
        paymentDate: "2023-05-15T09:35:00",
        processedBy: staffData[5],
      },
    ],
  },
  {
    id: 5,
    reservationNumber: "RES-2023-005",
    customer: customerData[4],
    status: "No-show",
    checkInDate: "2023-06-12",
    checkOutDate: "2023-06-14",
    adults: 1,
    children: 0,
    totalAmount: 200,
    createdAt: "2023-06-05T11:20:00",
    updatedAt: "2023-06-12T23:59:00",
    assignedRooms: [
      {
        id: 5,
        reservationId: 5,
        room: roomData[0],
        ratePerNight: 100,
        checkInDate: "2023-06-12",
        checkOutDate: "2023-06-14",
      },
    ],
    payments: [
      {
        id: 5,
        reservationId: 5,
        paymentNumber: "PAY-2023-005",
        amount: 200,
        paymentMethod: "Credit Card",
        paymentStatus: "Completed",
        transactionId: "TXN123460",
        paymentDate: "2023-06-05T11:25:00",
        processedBy: staffData[5],
      },
    ],
  },
];

// Mock food items
export const foodItemData: FoodItem[] = [
  {
    id: 1,
    name: "Continental Breakfast",
    description: "Assorted pastries, fruits, yogurt, and coffee",
    price: 15,
    category: "Breakfast",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
    ingredients: ["Pastries", "Fruits", "Yogurt", "Coffee"],
    allergens: ["Gluten", "Dairy"],
    preparationTime: 10,
  },
  {
    id: 2,
    name: "Eggs Benedict",
    description: "Poached eggs on English muffin with hollandaise sauce",
    price: 18,
    category: "Breakfast",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
    ingredients: [
      "Eggs",
      "English Muffin",
      "Canadian Bacon",
      "Hollandaise Sauce",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: 15,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 12,
    category: "Lunch",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: 8,
  },
  {
    id: 4,
    name: "Club Sandwich",
    description:
      "Triple-decker sandwich with turkey, bacon, lettuce, and tomato",
    price: 16,
    category: "Lunch",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821",
    ingredients: [
      "Bread",
      "Turkey",
      "Bacon",
      "Lettuce",
      "Tomato",
      "Mayonnaise",
    ],
    allergens: ["Gluten", "Eggs"],
    preparationTime: 12,
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description:
      "Fresh salmon fillet with seasonal vegetables and lemon butter sauce",
    price: 28,
    category: "Dinner",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    ingredients: ["Salmon", "Vegetables", "Lemon", "Butter", "Herbs"],
    allergens: ["Fish", "Dairy"],
    preparationTime: 20,
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 10,
    category: "Dessert",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Vanilla Ice Cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    preparationTime: 15,
  },
  {
    id: 7,
    name: "Fresh Fruit Platter",
    description: "Assortment of seasonal fruits",
    price: 14,
    category: "Dessert",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    ingredients: ["Seasonal Fruits"],
    allergens: [],
    preparationTime: 10,
  },
  {
    id: 8,
    name: "Sparkling Water",
    description: "Bottle of premium sparkling water",
    price: 5,
    category: "Beverage",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1603394630850-69b3ca8121ca",
    ingredients: ["Carbonated Water"],
    allergens: [],
    preparationTime: 1,
  },
  {
    id: 9,
    name: "House Red Wine",
    description: "Glass of our house red wine",
    price: 9,
    category: "Beverage",
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    ingredients: ["Red Wine"],
    allergens: ["Sulfites"],
    preparationTime: 2,
  },
];

// Mock food orders
export const foodOrderData: FoodOrder[] = [
  {
    id: 1,
    orderNumber: "FO-2023-001",
    roomId: 2,
    room: roomData[1],
    customerId: 1,
    customer: customerData[0],
    items: [
      {
        id: 1,
        orderId: 1,
        foodItem: foodItemData[0],
        quantity: 2,
        price: 30,
      },
      {
        id: 2,
        orderId: 1,
        foodItem: foodItemData[7],
        quantity: 2,
        price: 10,
      },
    ],
    totalAmount: 40,
    orderDate: "2023-06-15T08:30:00",
    status: "Delivered",
    preparedBy: staffData[4],
  },
  {
    id: 2,
    orderNumber: "FO-2023-002",
    roomId: 5,
    room: roomData[4],
    customerId: 2,
    customer: customerData[1],
    items: [
      {
        id: 3,
        orderId: 2,
        foodItem: foodItemData[3],
        quantity: 1,
        price: 16,
      },
      {
        id: 4,
        orderId: 2,
        foodItem: foodItemData[2],
        quantity: 1,
        price: 12,
      },
      {
        id: 5,
        orderId: 2,
        foodItem: foodItemData[8],
        quantity: 2,
        price: 18,
      },
    ],
    totalAmount: 46,
    orderDate: "2023-06-15T12:45:00",
    status: "Delivered",
    preparedBy: staffData[4],
  },
  {
    id: 3,
    orderNumber: "FO-2023-003",
    roomId: 10,
    room: roomData[9],
    customerId: 3,
    customer: customerData[2],
    items: [
      {
        id: 6,
        orderId: 3,
        foodItem: foodItemData[4],
        quantity: 2,
        price: 56,
      },
      {
        id: 7,
        orderId: 3,
        foodItem: foodItemData[5],
        quantity: 2,
        price: 20,
      },
      {
        id: 8,
        orderId: 3,
        foodItem: foodItemData[8],
        quantity: 1,
        price: 9,
      },
    ],
    totalAmount: 85,
    orderDate: "2023-06-15T19:15:00",
    status: "Preparing",
    preparedBy: staffData[4],
  },
];

// Mock banquet halls
export const banquetHallData: BanquetHall[] = [
  {
    id: 1,
    name: "Grand Ballroom",
    capacity: 300,
    pricePerHour: 500,
    description: "Elegant ballroom for weddings and large events",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3"],
    amenities: [
      "Stage",
      "Dance Floor",
      "Sound System",
      "Projector",
      "Catering",
    ],
    isAvailable: true,
  },
  {
    id: 2,
    name: "Executive Conference Room",
    capacity: 50,
    pricePerHour: 200,
    description: "Professional setting for business meetings and conferences",
    images: ["https://images.unsplash.com/photo-1517502884422-41eaead166d4"],
    amenities: [
      "Projector",
      "Video Conferencing",
      "Whiteboard",
      "Coffee Service",
    ],
    isAvailable: true,
  },
  {
    id: 3,
    name: "Garden Pavilion",
    capacity: 150,
    pricePerHour: 350,
    description: "Beautiful outdoor venue for ceremonies and receptions",
    images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"],
    amenities: ["Outdoor Setting", "Tent Option", "String Lights", "Catering"],
    isAvailable: true,
  },
];

// Mock inventory items
export const inventoryItemData: InventoryItem[] = [
  {
    id: 1,
    name: "Bath Towels",
    category: "Linen",
    quantity: 500,
    unit: "piece",
    reorderLevel: 100,
    cost: 8,
    supplier: "Linen Suppliers Inc.",
    lastRestocked: "2023-05-15",
    location: "Main Storage Room",
  },
  {
    id: 2,
    name: "Toilet Paper",
    category: "Toiletries",
    quantity: 1000,
    unit: "roll",
    reorderLevel: 200,
    cost: 0.5,
    supplier: "Cleaning Supplies Co.",
    lastRestocked: "2023-06-01",
    location: "Main Storage Room",
  },
  {
    id: 3,
    name: "Shampoo",
    category: "Toiletries",
    quantity: 800,
    unit: "bottle",
    reorderLevel: 150,
    cost: 1.2,
    supplier: "Amenities Plus",
    lastRestocked: "2023-05-20",
    location: "Housekeeping Storage",
  },
  {
    id: 4,
    name: "Coffee Pods",
    category: "Food",
    quantity: 1200,
    unit: "pod",
    reorderLevel: 300,
    cost: 0.4,
    supplier: "Coffee Distributors",
    lastRestocked: "2023-06-05",
    location: "Kitchen Storage",
  },
  {
    id: 5,
    name: "Light Bulbs",
    category: "Maintenance",
    quantity: 300,
    unit: "piece",
    reorderLevel: 50,
    cost: 2.5,
    supplier: "Electrical Supplies Ltd.",
    lastRestocked: "2023-04-10",
    location: "Maintenance Room",
  },
  {
    id: 6,
    name: "Bed Sheets",
    category: "Linen",
    quantity: 400,
    unit: "set",
    reorderLevel: 80,
    cost: 15,
    supplier: "Linen Suppliers Inc.",
    lastRestocked: "2023-05-15",
    location: "Main Storage Room",
  },
  {
    id: 7,
    name: "All-Purpose Cleaner",
    category: "Cleaning",
    quantity: 150,
    unit: "bottle",
    reorderLevel: 30,
    cost: 3.5,
    supplier: "Cleaning Supplies Co.",
    lastRestocked: "2023-05-25",
    location: "Housekeeping Storage",
  },
  {
    id: 8,
    name: "Printer Paper",
    category: "Office",
    quantity: 50,
    unit: "ream",
    reorderLevel: 10,
    cost: 4,
    supplier: "Office Depot",
    lastRestocked: "2023-06-10",
    location: "Admin Office",
  },
];

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalRooms: roomData.length,
  occupiedRooms: roomData.filter((room) => room.status === "Occupied").length,
  availableRooms: roomData.filter((room) => room.status === "Available").length,
  todayCheckIns: 3,
  todayCheckOuts: 2,
  pendingReservations: reservationData.filter(
    (res) => res.status === "Confirmed"
  ).length,
  monthlyRevenue: 25000,
  occupancyRate: 65,
};

// Revenue data for charts
export const revenueData: RevenueData[] = [
  { date: "2023-05-15", amount: 3200 },
  { date: "2023-05-16", amount: 2800 },
  { date: "2023-05-17", amount: 3500 },
  { date: "2023-05-18", amount: 4200 },
  { date: "2023-05-19", amount: 4800 },
  { date: "2023-05-20", amount: 5100 },
  { date: "2023-05-21", amount: 4700 },
  { date: "2023-05-22", amount: 3900 },
  { date: "2023-05-23", amount: 3600 },
  { date: "2023-05-24", amount: 4100 },
  { date: "2023-05-25", amount: 4400 },
  { date: "2023-05-26", amount: 4900 },
  { date: "2023-05-27", amount: 5300 },
  { date: "2023-05-28", amount: 5000 },
  { date: "2023-05-29", amount: 4500 },
  { date: "2023-05-30", amount: 4200 },
  { date: "2023-05-31", amount: 4600 },
  { date: "2023-06-01", amount: 5200 },
  { date: "2023-06-02", amount: 5500 },
  { date: "2023-06-03", amount: 5800 },
  { date: "2023-06-04", amount: 5400 },
  { date: "2023-06-05", amount: 5100 },
  { date: "2023-06-06", amount: 4800 },
  { date: "2023-06-07", amount: 5000 },
  { date: "2023-06-08", amount: 5300 },
  { date: "2023-06-09", amount: 5600 },
  { date: "2023-06-10", amount: 6000 },
  { date: "2023-06-11", amount: 5700 },
  { date: "2023-06-12", amount: 5400 },
  { date: "2023-06-13", amount: 5200 },
  { date: "2023-06-14", amount: 5500 },
  { date: "2023-06-15", amount: 5800 },
];

// Occupancy data for charts
export const occupancyData: OccupancyData[] = [
  { date: "2023-05-15", rate: 60 },
  { date: "2023-05-16", rate: 55 },
  { date: "2023-05-17", rate: 58 },
  { date: "2023-05-18", rate: 62 },
  { date: "2023-05-19", rate: 70 },
  { date: "2023-05-20", rate: 75 },
  { date: "2023-05-21", rate: 72 },
  { date: "2023-05-22", rate: 65 },
  { date: "2023-05-23", rate: 60 },
  { date: "2023-05-24", rate: 63 },
  { date: "2023-05-25", rate: 68 },
  { date: "2023-05-26", rate: 72 },
  { date: "2023-05-27", rate: 78 },
  { date: "2023-05-28", rate: 75 },
  { date: "2023-05-29", rate: 70 },
  { date: "2023-05-30", rate: 68 },
  { date: "2023-05-31", rate: 72 },
  { date: "2023-06-01", rate: 75 },
  { date: "2023-06-02", rate: 80 },
  { date: "2023-06-03", rate: 85 },
  { date: "2023-06-04", rate: 82 },
  { date: "2023-06-05", rate: 78 },
  { date: "2023-06-06", rate: 75 },
  { date: "2023-06-07", rate: 77 },
  { date: "2023-06-08", rate: 80 },
  { date: "2023-06-09", rate: 83 },
  { date: "2023-06-10", rate: 88 },
  { date: "2023-06-11", rate: 85 },
  { date: "2023-06-12", rate: 80 },
  { date: "2023-06-13", rate: 78 },
  { date: "2023-06-14", rate: 82 },
  { date: "2023-06-15", rate: 85 },
];

// System settings
export const systemSettings: SystemSettings = {
  hotelName: "Grand Hotel & Suites",
  address: "123 Luxury Avenue, Resort City, RC 12345",
  phone: "+1-234-567-8900",
  email: "info@grandhotelsuites.com",
  website: "www.grandhotelsuites.com",
  checkInTime: "15:00",
  checkOutTime: "11:00",
  currency: "USD",
  taxRate: 8.5,
  logo: "https://example.com/logo.png",
};

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

// Mock discount rates
export const discountRates: DiscountRate[] = [
  {
    id: 1,
    roomTypeId: 1,
    roomType: roomTypeData[0],
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
    roomType: roomTypeData[1],
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
    roomType: roomTypeData[2],
    name: "Weekend Special",
    ratePercentage: 12,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minNights: 2,
    description: "Book for weekends and get 12% off",
    isActive: true,
  },
];

export const houseKeeperRooms: HouseKeeperRoom[] = [
  {
    id: 1,
    roomNumber: "101",
    type: "Standard",
    status: "Cleaning",
    lastCleaned: "2025-05-30",
    assignedTo: "John Doe",
    priority: "medium",
    notes: undefined,
  },
  {
    id: 2,
    roomNumber: "102",
    type: "Deluxe",
    status: "Available",
    lastCleaned: "2025-06-01",
    assignedTo: "Jane Smith",
    priority: "low",
    notes: undefined,
  },
  {
    id: 3,
    roomNumber: "103",
    type: "Suite",
    status: "Maintenance",
    lastCleaned: "2025-05-29",
    assignedTo: "Emily Davis",
    priority: "high",
    notes: "AC unit needs repair",
  },
  {
    id: 4,
    roomNumber: "104",
    type: "Standard",
    status: "Occupied",
    lastCleaned: "2025-05-28",
    assignedTo: "Robert Johnson",
    priority: "medium",
    notes: undefined,
  },
  {
    id: 5,
    roomNumber: "105",
    type: "Deluxe",
    status: "Cleaning",
    lastCleaned: "2025-05-31",
    assignedTo: "Jane Smith",
    priority: "high",
    notes: undefined,
  },
];

// Helper functions
export const getAvailableRoomTypes = (
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  adults?: number,
  children?: number
) => {
  // In a real app, this would filter based on availability
  // For now, return all room types
  return roomTypeData.filter((roomType) => {
    if (adults && children && adults + children > roomType.maxOccupancy) {
      return false;
    }
    return true;
  });
};

export const getAvailableRooms = (roomTypeId: number) => {
  // In a real app, this would check availability for specific dates
  // For now, return all rooms of the selected type
  return roomData.filter(
    (room) => room.roomType.id === roomTypeId && room.status === "Available"
  );
};

export const calculateTotalPrice = (
  roomTypeId: number,
  checkInDate: Date,
  checkOutDate: Date
) => {
  const roomType = roomTypeData.find((rt) => rt.id === roomTypeId);
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

export const getRoomsByStatus = (status: string) => {
  return roomData.filter((room) => room.status === status);
};

export const getRoomsByType = (typeId: number) => {
  return roomData.filter((room) => room.roomType.id === typeId);
};

export const getReservationsByStatus = (status: string) => {
  return reservationData.filter((reservation) => reservation.status === status);
};

export const getReservationsByDateRange = (
  startDate: string,
  endDate: string
) => {
  return reservationData.filter(
    (reservation) =>
      reservation.checkInDate >= startDate &&
      reservation.checkOutDate <= endDate
  );
};

export const getInventoryItemsByCategory = (category: string) => {
  return inventoryItemData.filter((item) => item.category === category);
};

export const getLowStockItems = () => {
  return inventoryItemData.filter((item) => item.quantity <= item.reorderLevel);
};

export const getFoodItemsByCategory = (category: string) => {
  return foodItemData.filter((item) => item.category === category);
};

export const getActiveDiscountRates = () => {
  return discountRateData.filter((discount) => discount.isActive);
};

export const getStaffByDepartment = (department: string) => {
  return staffData.filter((staff) => staff.department === department);
};

export const getStaffByRole = (role: string) => {
  return staffData.filter((staff) => staff.role === role);
};

export const getActiveCustomers = () => {
  return customerData.filter((customer) => customer.status === "Active");
};

export const getTodayReservations = () => {
  const today = new Date().toISOString().split("T")[0];
  return reservationData.filter(
    (reservation) => reservation.checkInDate === today
  );
};

export const getTodayCheckouts = () => {
  const today = new Date().toISOString().split("T")[0];
  return reservationData.filter(
    (reservation) => reservation.checkOutDate === today
  );
};

export const calculateOccupancyRate = () => {
  const occupiedRooms = roomData.filter(
    (room) => room.status === "Occupied"
  ).length;
  return (occupiedRooms / roomData.length) * 100;
};

export const calculateRevenueForPeriod = (
  startDate: string,
  endDate: string
) => {
  return revenueData
    .filter((data) => data.date >= startDate && data.date <= endDate)
    .reduce((total, data) => total + data.amount, 0);
};
