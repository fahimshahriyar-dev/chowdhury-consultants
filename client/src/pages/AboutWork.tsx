import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import AboutContent from "./Home/HomeAbout";
import WorkShowcase from "./Home/HomeWork";

const AboutWork = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const [activeSection, setActiveSection] = useState<"about" | "work">(
    location.pathname === "/work" ? "work" : "about",
  );

  const transitionToWork = () => {
    if (isAnimatingRef.current || activeSection === "work") return;
    isAnimatingRef.current = true;
    gsap.to(workRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("work");
        navigate("/work", { replace: true });
      },
    });
  };

  const transitionToAbout = () => {
    if (isAnimatingRef.current || activeSection === "about") return;
    isAnimatingRef.current = true;
    gsap.to(workRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("about");
        navigate("/about", { replace: true });
      },
    });
  };

  useEffect(() => {
    if (location.pathname === "/work") {
      gsap.set(workRef.current, { y: "-100%" });
      setActiveSection("work");
    } else {
      gsap.set(workRef.current, { y: "0%" });
      setActiveSection("about");
    }
  }, []);

  useEffect(() => {
    const target = location.pathname === "/work" ? "work" : "about";
    if (isAnimatingRef.current || target === activeSection) return;
    gsap.set(workRef.current, { y: target === "work" ? "-100%" : "0%" });
    setActiveSection(target);
  }, [location.pathname]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;

      if (e.deltaY > 15) {
        if (activeSection === "about") {
          transitionToWork();
        }
      } else if (e.deltaY < -15) {
        if (activeSection === "work") {
          const scrollEl = workRef.current;
          if (!scrollEl || scrollEl.scrollTop <= 0) {
            transitionToAbout();
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (diffY > 50) {
        if (activeSection === "about") {
          transitionToWork();
        }
      } else if (diffY < -50) {
        if (activeSection === "work") {
          const scrollEl = workRef.current;
          if (!scrollEl || scrollEl.scrollTop <= 0) {
            transitionToAbout();
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#FEFEFE] overflow-hidden shadow-none"
    >
      <Navbar />

      {/* About */}
      <div className="w-full h-full">
        <AboutContent active={activeSection === "about"} />
      </div>

      {/* Work — slides up over About */}
      <div
        ref={workRef}
        className="absolute top-full left-0 w-full h-full z-20 overflow-y-auto overflow-x-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <WorkShowcase active={activeSection === "work"} />
      </div>
    </div>
  );
};

export default AboutWork;
