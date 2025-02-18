import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../styles/facilities.css";

import facility1 from "/icons/facility1.png";
import facility2 from "/icons/facility2.png";
import facility3 from "/icons/facility3.png";
import facility4 from "/icons/facility4.jpg";

export default function Facilities() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <section className="facilities section container">
      <div className="sec-container">
        <div className="sec-header flex">
          <div className="text-div">
            <h1 className="sec-title font-bold" data-aos="fade-up">
              Hotel's Facilites
            </h1>
          </div>
        </div>

        <div className="main-content">
          <div className="facilities-div grid">
            <div className="facility" data-aos="fade-up">
              <div className="img-div">
                <img src={facility1} alt="Image Name" />
              </div>
              <div className="text-div">
                <h3 className="font-semibold mb-2!">24-Hour Café</h3>
                <p>
                  Indulge in our 24-hour cafe's delectable dishes and delightful
                  ambiance for satisfaction.
                </p>
              </div>
            </div>

            <div
              className="facility"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div className="img-div hangout-place">
                <img src={facility3} alt="Image Name" />
              </div>
              <div className="text-div">
                <h3 className="font-semibold mb-2!">Hangout Place</h3>
                <p>
                  The perfect chill zone: Cozy atmosphere, good company, and
                  enjoyable entertainment you
                </p>
              </div>
            </div>

            <div
              className="facility"
              data-aos="fade-up"
              data-aos-duration="2500"
            >
              <div className="img-div">
                <img src={facility2} alt="Image Name" />
              </div>
              <div className="text-div">
                <h3 className="font-semibold mb-2!">Meeting Room</h3>
                <p>
                  Efficiency meets comfort in our thoughtfully designed meeting
                  space, perfect for focused discussions
                </p>
              </div>
            </div>

            <div
              className="facility"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              <div className="img-div swimming-pool">
                <img src={facility4} alt="Image Name" />
              </div>
              <div className="text-div">
                <h3 className="font-semibold mb-2!">Swimming Pool</h3>
                <p>
                  Dive into luxury and serenity at our exclusive hotel pool,
                  where crystal-clear waters meet unrivaled relaxation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
