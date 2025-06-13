import { ImFacebook } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../styles/footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="sec-container container grid transition-all! duration-300!">
        <div className="logo-div">
          <div className="footer-logo">
            <a href="/" className="logo flex">
              <h1 className="flex font-bold text-3xl text-[#213555]">
                StayEase
              </h1>
            </a>
          </div>
          <div className="socials flex">
            <ImFacebook className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div>
        </div>

        <div className="footer-links">
          <span className="link-title">About</span>
          <li>
            <a
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Room Types
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/booking");
              }}
              style={{ cursor: "pointer" }}
            >
              Book
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              About Us
            </a>
          </li>
        </div>

        <div className="footer-links">
          <span className="link-title">Hotel</span>
          <li>
            <a
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Why StayEase?
            </a>
          </li>
          <li>
            <a href="#">Partner With Us</a>
          </li>
          <li>
            <a href="">FAQ</a>
          </li>
        </div>

        <div className="footer-links">
          <span className="link-title">Contact Us</span>
          <a href="tel:+6282311511720" className="phone">+62 823 1151 1720</a>
          <a href="mailto:stayease@gmail.com" className="email">stayease@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
