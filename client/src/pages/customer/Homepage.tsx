import { useEffect } from "react";
import Hero from "@/components/customer/Hero";
import Facilities from "@/components/customer/Facilities";
import RoomTypes from "@/components/customer/RoomTypes";
import HotelVideo from "@/components/customer/HotelVideo";
import Review from "@/components/customer/Review";
import Contact from "@/components/customer/Contact";
import Book from "@/components/customer/Book";

function Index() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <Facilities />
      <RoomTypes />
      <HotelVideo />
      <Review />
      <Contact />
      <Book />
    </>
  );
}

export default Index;
