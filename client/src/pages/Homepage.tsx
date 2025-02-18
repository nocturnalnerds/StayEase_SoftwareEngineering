import { useEffect } from "react";
import Hero from "../components/homepage/Hero";
import Facilities from "../components/homepage/Facilities";
import RoomTypes from "../components/homepage/RoomTypes";
import HotelVideo from "../components/homepage/HotelVideo";
import Review from "../components/homepage/Review";
import Contact from "../components/homepage/Contact";
import Book from "../components/homepage/Book";

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
