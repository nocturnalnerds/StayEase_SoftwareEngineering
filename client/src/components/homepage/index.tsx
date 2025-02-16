import { useEffect } from "react";
import Hero from "./Hero";
import Facilities from "./Facilities";
import RoomTypes from "./RoomTypes";
import HotelVideo from "./HotelVideo";
import Review from "./Review";
import Contact from "./Contact";
import Book from "./Book";

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
