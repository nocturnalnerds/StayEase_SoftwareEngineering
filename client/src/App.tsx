import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/general/AppLayout";
import {
  BookingPage,
  DashboardPage,
  DiscountRatesPage,
  FoodBeverageSettingsPage,
  FrontOfficePage,
  Home,
  HouseKeepingPage,
  InventoryPage,
  Login,
  OffersPage,
  PaymentPage,
  ReportsPage,
  RestaurantPage,
  RoomSettingsPage,
  SettingsPage,
  Signup,
  UserManagementPage,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/general/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <AppLayout />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/offers", element: <OffersPage /> },
      { path: "/booking/:roomTypeId", element: <BookingPage /> },
    ],
  },
  {
    path: "/staff",
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "front-office", element: <FrontOfficePage /> },
      { path: "user-management", element: <UserManagementPage /> },
      { path: "house-keeping", element: <HouseKeepingPage /> },
      { path: "restaurant", element: <RestaurantPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "payment", element: <PaymentPage /> },
      {
        path: "settings",
        children: [
          { path: "", element: <SettingsPage /> },
          { path: "rooms", element: <RoomSettingsPage /> },
          { path: "food-beverage", element: <FoodBeverageSettingsPage /> },
          { path: "discount-rates", element: <DiscountRatesPage /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
