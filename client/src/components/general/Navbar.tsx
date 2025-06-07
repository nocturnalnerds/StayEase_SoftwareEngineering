import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import "../../styles/navbar.css";
import toast from "react-hot-toast";

const navItems = [
  {
    route: "",
    name: "Home",
  },
  {
    route: "booking",
    name: "Booking",
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  // code to toggle/show navbar;
  const [active, setActive] = useState("navbar");
  const showNav = () => {
    setActive("navbar active-navbar");
  };

  // code to remove navbar
  const removeNav = () => {
    setActive("navbar");
  };

  // code to add background color to the header
  const [transparent, setTransparet] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparet("header active-header");
    } else {
      setTransparet("header");
    }
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navbar-section">
      <div className={transparent}>
        <div
          className="logo-div"
          onClick={() => {
            navigate("/");
          }}
        >
          <h1 className="logo" style={{ color: "#213555", cursor: "pointer" }}>
            StayEase
          </h1>
        </div>
        <div className={active}>
          <ul className="nav-lists flex">
            {navItems.map((item, index) => {
              return (
                <NavItem key={index} route={item.route} name={item.name} />
              );
            })}
            {localStorage.getItem("token") ? (
              <button
                className="btn book-now transition-colors duration-300"
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully!");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn book-now transition-colors duration-300"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </button>
            )}
          </ul>
          <div onClick={removeNav} className="close-navbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggle-navbar">
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  );
}

function NavItem({ route, name }: { route: string; name: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <li
      className={`nav-item`}
      onClick={() => {
        navigate(`/${route}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className="nav-link transition-colors duration-300"
        style={{
          color: currentPath === `/${route}` ? "rgba(33, 53, 85, 1)" : "",
        }}
      >
        {name}
      </div>
    </li>
  );
}
