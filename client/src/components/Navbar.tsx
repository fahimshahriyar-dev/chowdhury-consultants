import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  whiteLogo?: boolean;
}

const Navbar = ({}: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const linkClass = (section: "home" | "work" | "about" | "profile") => {
    const isActive =
      section === "home"
        ? path === "/"
        : section === "work"
          ? path === "/work"
          : section === "about"
            ? path === "/about"
            : section === "profile"
              ? path === "/profile"
              : false;
    return isActive
      ? "text-xs sm:text-sm font-semibold text-black transition-colors uppercase tracking-wider cursor-pointer"
      : "text-xs sm:text-sm font-semibold text-black/60 hover:text-black transition-colors uppercase tracking-wider cursor-pointer";
  };

  const mobileLinkClass = (section: "home" | "work" | "about" | "profile") => {
    const isActive =
      section === "home"
        ? path === "/"
        : section === "work"
          ? path === "/work"
          : section === "about"
            ? path === "/about"
            : section === "profile"
              ? path === "/profile"
              : false;
    return isActive
      ? "text-base font-semibold text-black transition-colors uppercase tracking-wider cursor-pointer text-left w-full py-2.5 px-4 rounded-xl bg-black/10"
      : "text-base font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors uppercase tracking-wider cursor-pointer text-left w-full py-2.5 px-4 rounded-xl";
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" },
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const handleNavClick = (section: "home" | "work" | "about" | "profile") => {
    setMenuOpen(false);
    if (section === "home") {
      if (path === "/") {
        window.dispatchEvent(
          new CustomEvent("goto-section", { detail: "hero" }),
        );
      } else {
        navigate("/");
      }
    } else if (section === "work") {
      navigate("/work");
    } else if (section === "about") {
      navigate("/about");
    } else if (section === "profile") {
      navigate("/profile");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center container mx-auto px-4 sm:px-6 md:px-8 max-w-full bg-[#FEFEFE] py-4 sm:py-6 shadow-none">
      {/* Company Name in Middle (Absolute Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-semibold text-lg md:text-[30px] text-black uppercase tracking-normal select-none pointer-events-none whitespace-nowrap">
        Chowdhury Consultants
      </div>

      {/* Navigation Options - Left Side */}
      <nav
        ref={navRef}
        className="flex items-center justify-start z-10"
      >
        {/* Mobile hamburger toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-black/70 hover:text-black hover:bg-black/10 transition-colors cursor-pointer"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Links (desktop) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <button
            onClick={() => handleNavClick("home")}
            className={linkClass("home")}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("work")}
            className={linkClass("work")}
          >
            Work
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={linkClass("about")}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("profile")}
            className={linkClass("profile")}
          >
            Clients
          </button>
        </div>
      </nav>

      {/* Appointment button on Right Side */}
      <div className="flex items-center z-10">
        <button
          onClick={() => navigate("/appointment")}
          className="bg-black text-white rounded-full px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 cursor-pointer shadow-sm"
        >
          Appointment
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full mt-2 left-4 w-[min(80vw,280px)] bg-white border border-black/10 rounded-2xl p-2 shadow-lg z-20">
          <button
            onClick={() => handleNavClick("home")}
            className={mobileLinkClass("home")}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("work")}
            className={mobileLinkClass("work")}
          >
            Work
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={mobileLinkClass("about")}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("profile")}
            className={mobileLinkClass("profile")}
          >
            Clients
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
