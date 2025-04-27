import { useState, useEffect } from "react";
import { User } from "../types";
import hythrmiaLogo from "../assets/pictures/hythrmia.png";
import "../styles/hacker.css";

type AppNavProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Navbar = ({ user, setUser }: AppNavProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the menu is open or closed

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      updateBodyBackground(savedTheme);
    }
  }, []);

  const updateBodyBackground = (theme: "light" | "dark") => {
    document.body.style.background = theme === "dark"
      ? "linear-gradient(90deg, #0a0f2c, #1a0033)"
      : "linear-gradient(90deg, #b8c1ff, #d0a2f7)";
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateBodyBackground(newTheme);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        localStorage.removeItem("username");
        setUser(null);
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isDark = theme === "dark";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: isDark
          ? "linear-gradient(90deg, #0a0f2c, #1a0033)"
          : "linear-gradient(90deg, #b8c1ff, #d0a2f7)",
        padding: "0.7rem 2rem",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a
          className="navbar-brand d-flex align-items-center"
          href="/"
          style={{ paddingTop: "0", paddingBottom: "0" }}
        >
          <img
            src={hythrmiaLogo}
            alt="Hythrmia Logo"
            style={{
              height: "110px",
              objectFit: "contain",
              marginTop: "-10px",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => {
              (e.currentTarget.style.filter = "drop-shadow(0 0 10px red)");
            }}
            onMouseOut={(e) => {
              (e.currentTarget.style.filter = "none");
            }}
          />
        </a>

        {/* Hamburger Button (Toggle Menu) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links (Toggle visibility based on menu state) */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard" style={{ fontSize: "1.2rem", color: isDark ? "#fff" : "#1e1e1e" }}>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings" style={{ fontSize: "1.2rem", color: isDark ? "#fff" : "#1e1e1e" }}>
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/features" style={{ fontSize: "1.2rem", color: isDark ? "#fff" : "#1e1e1e" }}>
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about" style={{ fontSize: "1.2rem", color: isDark ? "#fff" : "#1e1e1e" }}>
                About
              </a>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center">
            <button
              onClick={toggleTheme}
              className="btn btn-sm me-2"
              style={{
                backgroundColor: isDark ? "#fff" : "#222",
                color: isDark ? "#000" : "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
              }}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {user ? (
              <>
                <span
                  className="text-success fw-bold me-3"
                  style={{ fontSize: "1.1rem" }}
                >
                  {user.user}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "1rem" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="btn btn-sm me-2"
                  style={{
                    backgroundColor: isDark ? "#8b5cf6" : "#fff",
                    color: "#000",
                    border: isDark ? "none" : "1px solid #333",
                    boxShadow: isDark ? "0 0 10px #8b5cf6" : "none",
                  }}
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: isDark ? "#8b5cf6" : "#000",
                    color: "#fff",
                    border: isDark ? "none" : "1px solid #333",
                    boxShadow: isDark ? "0 0 10px #8b5cf6" : "none",
                  }}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
