import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdKingBed } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { PiForkKnifeFill } from "react-icons/pi";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../styles/roomTypes.css";

import img1 from "/images/room1.jpeg";
import img2 from "/images/room2.jpeg";
import img3 from "/images/room3.jpeg";

const RoomTypesData = [
  {
    id: 1,
    imgSrc: img3,
    roomType: "STANDARD ROOM",
    roomsLeft: 21,
    price: 360,
    facilities: {
      beds: "1 bed",
      people: "2-3 People",
      breakfast: "2 People",
    },
  },
  {
    id: 2,
    imgSrc: img1,
    roomType: "DELUXE ROOM",
    roomsLeft: 11,
    price: 460,
    facilities: {
      beds: "1 bed",
      people: "2-3 People",
      breakfast: "2 People",
    },
  },
  {
    id: 3,
    imgSrc: img2,
    roomType: "FAMILY ROOM",
    roomsLeft: 8,
    price: 550,
    facilities: {
      beds: "2 beds",
      people: "4-6 People",
      breakfast: "2 People",
    },
  },
];

export default function RoomTypes() {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <section className="offer container section mt-[40px]!">
      <div className="sec-container">
        <div className="sec-intro">
          <h2 className="sec-title font-bold" data-aos="fade-up">
            Hotel Room Types
          </h2>
          <p data-aos="fade-up" data-aos-duration="2000">
            Explore a range of meticulously curated hotel room types, each
            designed to elevate your stay with a perfect blend of comfort,
            style, and personalized hospitality
          </p>
        </div>

        <div className="main-content grid">
          {RoomTypesData.map(({ id, imgSrc, roomType, price, facilities }) => {
            return (
              <div
                key={id}
                className="single-offer"
                data-aos="fade-up"
                data-aos-duration="3000"
              >
                <div className="dest-image">
                  <img src={imgSrc} alt="Image Name" />

                  <span className="rooms-left">30% Off</span>
                </div>

                <div className="offer-body">
                  <div className="room-type flex">
                    <h4>{roomType}</h4>
                  </div>

                  <div className="amenities flex">
                    <div className="single-amenity flex">
                      <MdKingBed className="icon" />
                      <small>{facilities.beds}</small>
                    </div>
                    <div className="single-amenity flex">
                      <IoMdPeople className="icon" />
                      <small>{facilities.people}</small>
                    </div>
                    <div className="single-amenity flex">
                      <PiForkKnifeFill className="icon" />
                      <small>{facilities.breakfast}</small>
                    </div>
                  </div>

                  <div className="price flex">Rp{price}.000</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="see-more">
          <button
            className="btn flex"
            data-aos="fade-up"
            data-aos-duration="3500"
            onClick={() => {
              navigate("/offers");
            }}
          >
            See More <BsArrowRightShort className="icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
