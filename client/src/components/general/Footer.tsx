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
                navigate("/home");
              }}
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/offers");
              }}
              style={{ cursor: "pointer" }}
            >
              Room Types
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/reservation");
              }}
              style={{ cursor: "pointer" }}
            >
              Book
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/about");
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
                navigate("/reviews");
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
          <span className="phone">+62 823 1151 1720</span>
          <span className="email">stayease@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
