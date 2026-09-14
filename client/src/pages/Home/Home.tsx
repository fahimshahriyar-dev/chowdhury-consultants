import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Preloader from "../../components/Preloader";
import Hero from "./Hero";
import About from "./HomeAbout";
import HomeWork from "./HomeWork";
import HomeService from "./HomeService";
import HomeCompanies from "./HomeCompanies";
import Cta from "./Cta";
import { gsap } from "gsap";

interface HomeProps {
  isAdminMode?: boolean;
}

export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
}

const DEFAULT_CONTENT: HomepageContent = {
  hero: {
    title: "Premier Corporate, Tax & Legal Advisory in Bangladesh",
    subtitle:
      "Trusted tax assessment, VAT compliance, corporate law, and RJSC advisory for leading multinationals and enterprises.",
    videoUrl: "https://www.youtube.com/watch?v=bSl7z00Hnug",
  },
};

const Home = ({ isAdminMode = false }: HomeProps) => {
  const [activeSection, setActiveSection] = useState<
    "hero" | "about" | "work" | "service" | "companies" | "cta"
  >("hero");
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroEntranceActive, setHeroEntranceActive] = useState(false);

  const handlePreloaderSlideUp = useCallback(() => {
    setHeroEntranceActive(true);
  }, []);

  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const companiesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Validate admin token if in admin mode
  useEffect(() => {
    if (isAdminMode) {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/signin");
      }
    }
  }, [isAdminMode, navigate]);

  // Fetch dynamic content
  const fetchContent = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/content");
      if (!response.ok) {
        throw new Error("Failed to load website content");
      }
      const data = await response.json();
      setContent(data);
    } catch (err: any) {
      console.warn(
        "Backend server not available, using default static content:",
        err.message,
      );
      setContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleUpdateHero = async (
    title: string,
    subtitle: string,
    videoUrl?: string,
  ) => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch("http://localhost:5000/api/content/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, subtitle, videoUrl }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/signin");
          return;
        }
        throw new Error("Failed to update hero");
      }
      const updated = await response.json();
      setContent(updated);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const transitionToAbout = () => {
    if (isAnimatingRef.current || activeSection === "about") return;
    isAnimatingRef.current = true;
    if (aboutRef.current) {
      aboutRef.current.scrollTop = 0;
    }
    gsap.to(aboutRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("about");
      },
    });
    gsap.to(workRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(serviceRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(companiesRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(ctaRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
  };

  const transitionToWork = () => {
    if (isAnimatingRef.current || activeSection === "work") return;
    isAnimatingRef.current = true;
    if (workRef.current) {
      workRef.current.scrollTop = 0;
    }
    gsap.to(aboutRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(workRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("work");
      },
    });
    gsap.to(serviceRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(companiesRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(ctaRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
  };

  const transitionToService = () => {
    if (isAnimatingRef.current || activeSection === "service") return;
    isAnimatingRef.current = true;
    if (serviceRef.current) {
      serviceRef.current.scrollTop = 0;
    }
    gsap.to(aboutRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(workRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(serviceRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("service");
      },
    });
    gsap.to(companiesRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(ctaRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
  };

  const transitionToCompanies = () => {
    if (isAnimatingRef.current || activeSection === "companies") return;
    isAnimatingRef.current = true;
    if (companiesRef.current) {
      companiesRef.current.scrollTop = 0;
    }
    gsap.to(aboutRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(workRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(serviceRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(companiesRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("companies");
      },
    });
    gsap.to(ctaRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
  };

  const transitionToCta = () => {
    if (isAnimatingRef.current || activeSection === "cta") return;
    isAnimatingRef.current = true;
    if (ctaRef.current) {
      ctaRef.current.scrollTop = 0;
    }
    gsap.to(aboutRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(workRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(serviceRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(companiesRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(ctaRef.current, {
      y: "-100%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("cta");
      },
    });
  };

  const transitionToHero = () => {
    if (isAnimatingRef.current || activeSection === "hero") return;
    isAnimatingRef.current = true;
    gsap.to(aboutRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(workRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(serviceRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(companiesRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(ctaRef.current, {
      y: "0%",
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setActiveSection("hero");
      },
    });
  };

  useEffect(() => {
    const targetSection = (location.state as { section?: string })?.section;
    if (targetSection === "homework") {
      transitionToAbout();
      window.history.replaceState({}, document.title);
    } else if (targetSection === "work") {
      transitionToWork();
      window.history.replaceState({}, document.title);
    } else if (targetSection === "service") {
      transitionToService();
      window.history.replaceState({}, document.title);
    } else if (targetSection === "companies") {
      transitionToCompanies();
      window.history.replaceState({}, document.title);
    } else if (targetSection === "cta") {
      transitionToCta();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, loading]);

  useEffect(() => {
    let touchStartY = 0;

    const isWorkAtBottom = () => {
      const el = workRef.current;
      if (!el) return true;
      return el.scrollHeight - el.scrollTop - el.clientHeight <= 5;
    };

    // Read the inner scrollable box inside HomeService (data-service-box)
    const getServiceBox = (): HTMLElement | null =>
      (serviceRef.current?.querySelector(
        "[data-service-box]",
      ) as HTMLElement | null) ?? null;

    const isServiceAtTop = () => {
      const box = getServiceBox();
      if (box) return box.scrollTop <= 0;
      return (serviceRef.current?.scrollTop ?? 0) <= 0;
    };

    const isCtaAtTop = () => {
      const el = ctaRef.current;
      if (!el) return true;
      return el.scrollTop <= 20;
    };

    const scrollToFooter = () => {
      const el = ctaRef.current;
      if (!el || isAnimatingRef.current) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      isAnimatingRef.current = true;
      gsap.to(el, {
        scrollTop: maxScroll,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    };

    const scrollToCtaTop = () => {
      const el = ctaRef.current;
      if (!el || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      gsap.to(el, {
        scrollTop: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) {
        // Block native scroll while a GSAP transition/tween owns scrollTop,
        // otherwise the browser's native scroll and the tween fight and blink.
        e.preventDefault();
        return;
      }

      // Let HomeService handle its own wheel events when hovering the service box
      if (activeSection === "service") {
        const target = e.target as HTMLElement;
        if (target.closest("[data-service-box-container]")) return;
      }

      if (e.deltaY > 15) {
        if (activeSection === "hero") {
          e.preventDefault();
          transitionToAbout();
        } else if (activeSection === "about") {
          e.preventDefault();
          transitionToWork();
        } else if (activeSection === "work") {
          if (isWorkAtBottom()) {
            e.preventDefault();
            transitionToService();
          }
          // else: let native scroll continue inside work
        } else if (activeSection === "service") {
          e.preventDefault();
          transitionToCompanies();
        } else if (activeSection === "companies") {
          e.preventDefault();
          transitionToCta();
        } else if (activeSection === "cta") {
          if (isCtaAtTop()) {
            e.preventDefault();
            scrollToFooter();
          }
          // else: let native scroll continue inside cta
        }
      } else if (e.deltaY < -15) {
        if (activeSection === "about") {
          const scrollEl = aboutRef.current;
          if (!scrollEl || scrollEl.scrollTop <= 0) {
            e.preventDefault();
            transitionToHero();
          }
        } else if (activeSection === "work") {
          if (!workRef.current || workRef.current.scrollTop <= 0) {
            e.preventDefault();
            transitionToAbout();
          }
        } else if (activeSection === "service") {
          if (isServiceAtTop()) {
            e.preventDefault();
            transitionToWork();
          }
        } else if (activeSection === "companies") {
          e.preventDefault();
          transitionToService();
        } else if (activeSection === "cta") {
          if (!isCtaAtTop()) {
            e.preventDefault();
            scrollToCtaTop();
          } else {
            e.preventDefault();
            transitionToCompanies();
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
        if (activeSection === "hero") {
          transitionToAbout();
        } else if (activeSection === "about") {
          transitionToWork();
        } else if (activeSection === "work") {
          if (isWorkAtBottom()) {
            transitionToService();
          }
        } else if (activeSection === "service") {
          transitionToCompanies();
        } else if (activeSection === "companies") {
          transitionToCta();
        } else if (activeSection === "cta") {
          if (isCtaAtTop()) {
            scrollToFooter();
          }
        }
      } else if (diffY < -50) {
        if (activeSection === "about") {
          const scrollEl = aboutRef.current;
          if (!scrollEl || scrollEl.scrollTop <= 0) {
            transitionToHero();
          }
        } else if (activeSection === "work") {
          if (!workRef.current || workRef.current.scrollTop <= 0) {
            transitionToAbout();
          }
        } else if (activeSection === "service") {
          if (isServiceAtTop()) {
            transitionToWork();
          }
        } else if (activeSection === "companies") {
          transitionToService();
        } else if (activeSection === "cta") {
          if (!isCtaAtTop()) {
            scrollToCtaTop();
          } else {
            transitionToCompanies();
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      // NOTE: wheel listener must be non-passive so we can preventDefault()
      // and stop the browser's native scroll from racing our GSAP tweens.
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [activeSection, loading]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "homework") transitionToAbout();
      if (detail === "work") transitionToWork();
      if (detail === "service") transitionToService();
      if (detail === "companies") transitionToCompanies();
      if (detail === "hero") transitionToHero();
      if (detail === "cta") transitionToCta();
    };
    window.addEventListener("goto-section", handler);
    return () => window.removeEventListener("goto-section", handler);
  }, [activeSection, loading]);

  const heroTitle =
    content?.hero?.title ||
    "Premier Corporate, Tax & Legal Advisory in Bangladesh";
  const heroSubtitle =
    content?.hero?.subtitle ||
    "Trusted tax assessment, VAT compliance, corporate law, and RJSC advisory for leading multinationals and enterprises.";
  const heroVideoUrl =
    content?.hero?.videoUrl || "https://www.youtube.com/watch?v=bSl7z00Hnug";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#FEFEFE] overflow-hidden shadow-none"
    >
      {/* Intro Preloader Layer */}
      <Preloader
        onSlideUp={handlePreloaderSlideUp}
        onComplete={handlePreloaderSlideUp}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FEFEFE] text-black">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-[#10B981] mx-auto mb-4"></div>
            <p className="text-sm text-zinc-500">Loading contents...</p>
          </div>
        </div>
      )}

      {isAdminMode && (
        <div className="fixed top-6 right-6 md:right-10 z-[100] flex flex-col items-end gap-2">
          {/* Admin Profile button + Logout */}
          <div className="hidden md:flex items-center gap-3 bg-[#06102F]/90 backdrop-blur-md border border-[#0086F0]/40 rounded-full px-5 py-3 shadow-xl shadow-black/40">
            <button
              onClick={() => navigate("/admin/profile")}
              className="flex items-center gap-2 text-xs font-bold text-[#5ACFFE] uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#0086F0] animate-ping" />
              Admin Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-[#0086F0]/25 rounded-full px-3 py-1 transition-all cursor-pointer border border-transparent hover:border-[#0086F0]/30"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {!loading && <Navbar whiteLogo={activeSection === "hero"} />}

      {/* Hero */}
      <div id="hero-section" className="w-full h-full">
        <Hero
          active={activeSection === "hero" && heroEntranceActive}
          standalone={false}
          onGoToHomeWork={transitionToAbout}
          title={heroTitle}
          subtitle={heroSubtitle}
          videoUrl={heroVideoUrl}
          isAdminMode={isAdminMode}
          onUpdateHero={handleUpdateHero}
        />
      </div>

      {/* About — slides up over Hero */}
      <div
        ref={aboutRef}
        id="about-section"
        className="absolute top-full left-0 w-full h-full z-20 overflow-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <About active={activeSection === "about"} />
      </div>

      {/* Work — slides up over About */}
      <div
        ref={workRef}
        id="work-section"
        className="absolute top-full left-0 w-full h-full z-30 overflow-y-auto overflow-x-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <HomeWork active={activeSection === "work"} />
      </div>

      {/* Service — slides up over Work */}
      <div
        ref={serviceRef}
        id="service-section"
        className="absolute top-full left-0 w-full h-full z-40 overflow-y-auto overflow-x-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <HomeService
          active={activeSection === "service"}
          onGoToPreviousPage={transitionToWork}
          onGoToNextPage={transitionToCompanies}
        />
      </div>

      {/* Companies — slides up over Service */}
      <div
        ref={companiesRef}
        id="companies-section"
        className="absolute top-full left-0 w-full h-full z-50 overflow-y-auto overflow-x-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <HomeCompanies
          active={activeSection === "companies"}
          onGoToPreviousPage={transitionToService}
          onGoToNextPage={transitionToCta}
        />
      </div>

      {/* Cta + Footer — slides up over Companies */}
      <div
        ref={ctaRef}
        id="cta-section"
        className="absolute top-full left-0 w-full h-full z-[60] overflow-y-auto overflow-x-hidden bg-[#FEFEFE]"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <Cta active={activeSection === "cta"} />
        <Footer />
      </div>
    </div>
  );
};

export default Home;