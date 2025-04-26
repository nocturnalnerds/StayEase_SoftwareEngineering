import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../styles/book.css";

export default function Book() {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  // scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="book container section" data-aos="fade-up">
      <div className="sec-container">
        <div className="text-div">
          <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
            Reserve Your Stay Instantly!
          </h2>
          <p data-aos="fade-up" data-aos-duration="1250">
            Seize the opportunity to secure your dream getaway instantly with
            our hassle-free reservation process
          </p>
        </div>
        <button
          className="btn transition duration-200"
          data-aos="fade-up"
          data-aos-duration="1500"
          onClick={() => {
            navigate("/booking");
          }}
        >
          Book Now
        </button>
      </div>
    </section>
  );
}
