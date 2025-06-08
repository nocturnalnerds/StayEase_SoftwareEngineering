import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../styles/hotelVideo.css";

import video from "/video/video.mp4";

export default function HotelVideo() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <section className="video-section  section ">
      <div className="sec-container">
        <div className="video-card container">
          <div className="card-content grid">
            <div className="card-text">
              <h2 data-aos="fade-right">
                Discover the Essence of our Hotel in Stunning Video
              </h2>
              <p data-aos="fade-right" data-aos-duration="2000">
                Experience the epitome of convenience and elegance at StayEase,
                where our meticulously designed facilities cater to your every
                need
              </p>
            </div>
            <div className="card-video">
              <video src={video} autoPlay loop muted></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
