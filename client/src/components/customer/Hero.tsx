import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../styles/hero.css";

import { MdOutlineFreeBreakfast } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { LuRefrigerator } from "react-icons/lu";

export default function Hero() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <section className="hero">
      <div className="sec-container container">
        <div className="hero-text">
          <h1 className="title" data-aos="fade-up">
            Elegant Escape at StayEase
          </h1>
          <p className="sub-title" data-aos-duration="2000" data-aos="fade-up">
            Where timeless charm, exquisite surroundings, and warm hospitality
            create an oasis of serenity
          </p>
        </div>

        <div className="hero-card grid">
          <div className="benefits">
            <div className="benefit" data-aos="fade-up">
              <IoWifi className="icon wifi" />
              <p>Wi-Fi</p>
            </div>
            <div
              className="benefit"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <MdOutlineFreeBreakfast className="icon breakfast" />
              <p>Breakfast</p>
            </div>
            <div
              className="benefit"
              data-aos="fade-up"
              data-aos-duration="2500"
            >
              <TbAirConditioning className="icon ac" />
              <p>AC</p>
            </div>
            <div
              className="benefit"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              <LuRefrigerator className="icon minibar" />
              <p>Minibar</p>
            </div>
          </div>
          <div className="check-in-out">
            <div
              className="check-in"
              data-aos="fade-right"
              data-aos-duration="2500"
            >
              <h3>Check-In</h3>
              <p>Start: 09.00</p>
              <p>End: 12.00</p>
            </div>
            <div
              className="check-out"
              data-aos="fade-right"
              data-aos-duration="3000"
            >
              <h3>Check-Out</h3>
              <p>Start: 13.00</p>
              <p>End: 16.00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
