import { PiForkKnifeBold } from "react-icons/pi";
import Heading from "../components/general/Heading";
import { formatPrice } from "../lib/utils";
import offerHeading from "/images/offers.avif";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RoomCardProps } from "../lib/types";

const offersData = [
  {
    image: "/images/room1.jpeg",
    roomType: "Standard Room",
    price: 360,
    beds: 1,
    maxGuests: 3,
    maxBreakfasts: 2,
  },
  {
    image: "/images/room2.jpeg",
    roomType: "Deluxe Room",
    price: 460,
    beds: 1,
    maxGuests: 3,
    maxBreakfasts: 2,
  },
  {
    image: "/images/room3.jpeg",
    roomType: "Family Room",
    price: 550,
    beds: 2,
    maxGuests: 6,
    maxBreakfasts: 2,
  },
];

export default function Offers() {
  return (
    <section className="offers pt-[70px]">
      <Heading
        image={offerHeading}
        title="Offers Page"
        description="Explore a range of meticulously curated hotel room types, each designed to elevate your stay with a perfect blend of comfort"
      />
      <div className="container">
        <div className="filter"></div>
        <div className="offersContainer">
          {offersData.map((offer, index) => (
            <RoomCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomCard({
  image,
  roomType,
  price,
  beds,
  maxGuests,
  maxBreakfasts,
}: RoomCardProps) {
  return (
    <div className="room-card">
      <img src={image} alt="Hotel Room" />
      <div className="room-details">
        <h3>{roomType}</h3>
        <h1>{formatPrice(price)}</h1>
        <p>
          <span> {beds}</span>
          <span>
            <MdOutlinePersonOutline />: {maxGuests}
          </span>
          <span>
            <PiForkKnifeBold /> {maxBreakfasts}
          </span>
        </p>
      </div>
    </div>
  );
}
