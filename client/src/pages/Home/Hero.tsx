import React, { useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  LayoutDashboard,
  Briefcase,
  Handshake,
  Users,
  Award,
  ShieldCheck,
  Building2,
  Building,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Globe,
  Layers,
  Landmark,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import heroBg from "../../assets/images/hero_bg.png";
import sidebarBg from "../../assets/images/hero_bg-2.png";

interface HeroProps {
  standalone?: boolean;
  onGoToHomeWork?: () => void;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  isAdminMode?: boolean;
  onUpdateHero?: (
    title: string,
    subtitle: string,
    videoUrl: string,
  ) => Promise<void>;
  active?: boolean;
}

// Overview Data
const overviewStats = [
  {
    label: "Years of Trust",
    value: "25+",
    icon: Award,
    desc: "Tax & Legal Excellence",
  },
  {
    label: "Corporate Clients",
    value: "70+",
    icon: Users,
    desc: "MNCs & Conglomerates",
  },
  {
    label: "Success Rate",
    value: "99%",
    icon: ShieldCheck,
    desc: "NBR Assessment & Appeals",
  },
];

const overviewHighlights = [
  {
    title: "Corporate & RJSC Secretarial",
    desc: "Company formation, annual filings, share transfers, and FDI compliance.",
    badge: "Corporate",
  },
  {
    title: "Taxation & VAT Advisory",
    desc: "Corporate tax assessment, NBR tax holidays, and appellate representation.",
    badge: "Tax Advisory",
  },
  {
    title: "Liaison & Foreign Offices",
    desc: "BIDA approvals, 18B BB permissions, and expat work permits.",
    badge: "Foreign Investment",
  },
];

// Featured Works Data (from HomeWork.tsx)
const heroWorks = [
  {
    id: 1,
    company: "Apex Holdings Ltd.",
    service: "Income Tax Advisory & Filing",
    category: "Taxation",
    status: "Completed",
    impact: "Full NBR clearance & tax optimization",
  },
  {
    id: 2,
    company: "Grameen Telecom",
    service: "Corporate Audit & VAT Compliance",
    category: "Audit & VAT",
    status: "Verified",
    impact: "Annual audit & VAT registration compliance",
  },
  {
    id: 3,
    company: "Beximco Pharma",
    service: "Financial Restructuring & Advisory",
    category: "Corporate Finance",
    status: "Completed",
    impact: "Capital restructuring & regulatory filings",
  },
  {
    id: 4,
    company: "Square Group",
    service: "Tax Assessment & Appellate Representation",
    category: "High Court Tribunal",
    status: "Appellate Granted",
    impact: "Successful defence at Tax Appellate Tribunal",
  },
];

// Services Categorized (from HomeService.tsx)
const heroServicesCategories = [
  {
    id: "local",
    label: "Local & Joint Venture",
    icon: Building2,
    badge: "RJSC & Corporate",
    services: [
      "Secretarial Works (RJSC) & Share Transfer",
      "Trade License, IRC & ERC Registration",
      "VAT Registration (Local & Import)",
      "Corporate Tax & Quarterly Financial Filing",
      "Tax Holiday & NBR Exemption Permissions",
      "Provident, Gratuity & Pension Fund Approvals",
    ],
  },
  {
    id: "liaison",
    label: "Liaison & Branch Office",
    icon: Building,
    badge: "Foreign Entity Setup",
    services: [
      "Liaison/Branch Office BIDA & BOI Permission",
      "18B Permission from Bangladesh Bank",
      "Annual Permission Renewal & Quarterly Accounts",
      "Corporate Tax & Legal Compliance for Foreign Entities",
      "Company’s other legal matters & court representation",
    ],
  },
  {
    id: "individual",
    label: "Expat & Individual Tax",
    icon: UserCheck,
    badge: "Personal & Expat",
    services: [
      "“E” Visa Recommendation & Work Permit",
      "Multiple Visa Permission & Renewal",
      "Security Clearance for Foreign Nationals",
      "Salary Tax Computation & Employee Returns",
      "Individual Income Tax Return Assessment",
    ],
  },
];

// Clients Categorized (from Clients.tsx & HomeCompanies.tsx)
const heroClientCategories = [
  {
    id: "mnc",
    label: "Multinational",
    icon: Globe,
    clients: [
      "Grameen Phone Ltd.",
      "Grameenphone IT Ltd.",
      "Holcim Cement (Bangladesh) Ltd.",
      "Bayer Crops Science Limited",
      "Grameen Telecom",
      "Grameen Danone Foods Ltd.",
    ],
  },
  {
    id: "group",
    label: "Group Companies",
    icon: Layers,
    clients: [
      "Baly Group of Company",
      "Nur & Nahar Group",
      "NEN Group",
      "Shafiul Alam Steel Mills",
      "Fariha Spinning Mills",
      "Urmi Group of Company",
    ],
  },
  {
    id: "foreign",
    label: "Foreign Shareholder & Liaison",
    icon: Landmark,
    clients: [
      "Delegation of European Union",
      "VF Asia Limited",
      "Scomi Oiltools Limited",
      "Li & Fung (Bangladesh) Ltd.",
      "Triton Textile Limited",
      "Fullcharm Fashions Ltd.",
    ],
  },
];

const Hero: React.FC<HeroProps> = ({
  onGoToHomeWork,
  title,
  subtitle,
  active = true,
}) => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState<string>("Overview");
  const [selectedServiceCat, setSelectedServiceCat] = useState<string>("local");
  const [selectedClientCat, setSelectedClientCat] = useState<string>("mnc");
  const [selectedWorkId, setSelectedWorkId] = useState<number>(1);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const dashboardBoxRef = useRef<HTMLDivElement>(null);
  const sidebarOptionsRef = useRef<HTMLDivElement>(null);
  const rightBoxHeaderRef = useRef<HTMLDivElement>(null);

  const titleContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const options = [
    { id: "Overview", label: "Overview", icon: LayoutDashboard },
    { id: "Works", label: "Works", icon: Briefcase },
    { id: "Services", label: "Services", icon: Handshake },
    { id: "Clients", label: "Clients", icon: Users },
  ];

  // Helper to handle CTA / Navigation
  const handlePrimaryCta = () => {
    if (onGoToHomeWork) {
      onGoToHomeWork();
    } else {
      navigate("/appointment");
    }
  };

  // Title words array builder
  const getTitleWords = (option: string) => {
    switch (option) {
      case "Overview":
        return ["Overview", "—", "Company", "Highlights", "&", "Trust"];
      case "Works":
        return ["Works", "—", "Featured", "Case", "Studies"];
      case "Services":
        return ["Services", "—", "Core", "Advisory", "Solutions"];
      case "Clients":
        return ["Clients", "—", "Corporate", "Industry", "Leaders"];
      default:
        return [option];
    }
  };

  // Entrance animation when entering Hero page (matching About / Work / Service pages)
  useLayoutEffect(() => {
    const titleWords = heroTitleRef.current?.querySelectorAll(".hero-word") ?? [];
    const sidebarButtons = sidebarOptionsRef.current?.querySelectorAll("button") ?? [];
    const initialDataEls = contentContainerRef.current?.querySelectorAll(".data-anim-item") ?? [];

    // Initial state: hidden and positioned below / scaled up
    if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 0, y: 20 });
    if (titleWords.length > 0) {
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
    }
    if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 60, opacity: 0 });
    if (ctaButtonRef.current) gsap.set(ctaButtonRef.current, { y: 40, opacity: 0 });
    if (dashboardBoxRef.current) gsap.set(dashboardBoxRef.current, { y: 80, opacity: 0 });
    if (sidebarButtons.length > 0) gsap.set(sidebarButtons, { y: 20, opacity: 0 });
    if (rightBoxHeaderRef.current) gsap.set(rightBoxHeaderRef.current, { y: 20, opacity: 0 });
    if (initialDataEls.length > 0) gsap.set(initialDataEls, { y: 35, opacity: 0 });

    if (!active) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Badge fades in
    if (badgeRef.current) {
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 });
    }

    // 2. Title word by word entrance (matching About / Work / Service pages)
    if (titleWords.length > 0) {
      tl.to(
        titleWords,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // 3. Subtitle text comes from bottom
    if (subtitleRef.current) {
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }

    // 4. Button comes from bottom
    if (ctaButtonRef.current) {
      tl.to(
        ctaButtonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }

    // 5. Box comes from bottom
    if (dashboardBoxRef.current) {
      tl.to(
        dashboardBoxRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }

    // 6. Content inside box animates
    if (sidebarButtons.length > 0) {
      tl.to(
        sidebarButtons,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    if (rightBoxHeaderRef.current) {
      tl.to(
        rightBoxHeaderRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    if (initialDataEls.length > 0) {
      tl.to(
        initialDataEls,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    return () => {
      tl.kill();
    };
  }, [active, title]);

  // useLayoutEffect runs before browser paint — GSAP sets opacity 0 before new content is ever visible
  useLayoutEffect(() => {
    // --- Title words ---
    if (titleContainerRef.current) {
      const wordEls = Array.from(
        titleContainerRef.current.querySelectorAll<HTMLElement>(".word-item")
      );
      if (wordEls.length > 0) {
        // Strip CSS transitions so gsap.set doesn't trigger a CSS-animated "drop"
        wordEls.forEach(el => (el.style.transition = "none"));
        gsap.killTweensOf(wordEls);
        gsap.set(wordEls, { y: 22, opacity: 0 });
        gsap.to(wordEls, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          onComplete: () => wordEls.forEach(el => (el.style.transition = "")),
        });
      }
    }

    // --- Content items ---
    if (contentContainerRef.current) {
      const dataEls = Array.from(
        contentContainerRef.current.querySelectorAll<HTMLElement>(".data-anim-item")
      );
      if (dataEls.length > 0) {
        // Strip CSS transitions (transition-all / transition-colors) before gsap.set
        // to prevent the browser from animating y: 0 → 35 (the "going down" flash)
        dataEls.forEach(el => (el.style.transition = "none"));
        gsap.killTweensOf(dataEls);
        gsap.set(dataEls, { y: 35, opacity: 0 });
        gsap.to(dataEls, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          // Restore CSS transitions after animation so hover effects still work
          onComplete: () => dataEls.forEach(el => (el.style.transition = "")),
        });
      }
    }
    // No cleanup / revert — prevents reverse animation when switching tabs
  }, [activeOption, selectedServiceCat, selectedClientCat]);

  return (
    <div ref={heroContainerRef} className="w-full min-h-screen h-dvh bg-[#FEFEFE] container pt-24 pb-12">
      {/* Main Box with Hero Background */}
      <div
        className="w-full h-full rounded-3xl bg-no-repeat bg-left-top bg-cover px-6 md:px-12 lg:px-22 flex flex-col justify-between overflow-hidden shadow-2xl relative"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Hero Header Section */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mt-8 mb-6">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium mb-3 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>25+ Years of Corporate & Tax Excellence</span>
          </div>

          <h1
            ref={heroTitleRef}
            className="w-full max-w-5xl lg:max-w-6xl text-3xl md:text-5xl lg:text-[64px] font-semibold tracking-tight text-white leading-[1.12] font-sans pb-[0.1em] text-center"
          >
            {(title || "Premier Corporate, Tax & Legal Advisory in Bangladesh")
              .split(" ")
              .map((word, i) => (
                <span key={i} className="inline-block pb-1 mr-[0.28em] last:mr-0">
                  <span className="hero-word inline-block will-change-transform bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                </span>
              ))}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-3 text-zinc-300 text-xs md:text-sm lg:text-base max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed text-center"
          >
            {subtitle ||
              "Trusted tax assessment, VAT compliance, corporate law, and RJSC advisory for leading multinationals and enterprises."}
          </p>

          <button
            ref={ctaButtonRef}
            onClick={handlePrimaryCta}
            className="mt-5 bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-2.5 rounded-full text-xs md:text-sm transition-all duration-200 shadow-lg cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Lower Dashboard Panel Container */}
        <div
          ref={dashboardBoxRef}
          className="relative z-10 w-full flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 mt-auto"
        >
          {/* Part 1: Left Sidebar Section with Background */}
          <div
            className="md:col-span-1 rounded-tl-[24px] rounded-tr-[24px] rounded-bl-none rounded-br-[24px] md:rounded-tr-none md:rounded-br-none overflow-hidden flex flex-col p-6 min-h-[280px] bg-cover bg-center shadow-xl relative border-t border-l border-zinc-800 md:border-r-0"
            style={{ backgroundImage: `url(${sidebarBg})` }}
          >
            {/* Tint Overlay */}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] z-0" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* Brand Title */}
                <div className="font-bold text-sm md:text-base text-white tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>CHOWDHURY CONSULTANTS</span>
                </div>

                {/* Sidebar Options */}
                <div ref={sidebarOptionsRef} className="flex flex-col gap-2">
                  {options.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = activeOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setActiveOption(opt.id)}
                        className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border border-transparent outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none select-none ${
                          isActive
                            ? "bg-white/15 text-white font-semibold shadow-md"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon
                          className={`w-4.5 h-4.5 ${
                            isActive ? "text-[#10b981]" : "text-zinc-400"
                          }`}
                        />
                        <span className="text-base">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Quick Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>NBR Registered Firm</span>
                <span className="text-[#10b981] font-semibold">25+ Yrs</span>
              </div>
            </div>
          </div>

          {/* Part 2: Right Main Box (Dynamic Data Content) */}
          <div className="md:col-span-3 bg-zinc-950/95 backdrop-blur-md rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none md:rounded-tl-none md:rounded-bl-none p-5 md:p-6 flex flex-col justify-between min-h-[300px] max-h-[420px] shadow-2xl relative overflow-hidden">
            {/* Custom Curved Border Accent */}
            <div className="absolute inset-0 rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none md:rounded-tl-none md:rounded-bl-none border-t border-r border-zinc-700/80 pointer-events-none z-25" />

            {/* Header row in Right Box */}
            <div
              ref={rightBoxHeaderRef}
              className="flex justify-between items-center w-full pb-3 border-b border-zinc-800/80"
            >
              {/* Word-by-Word Animated Title Container */}
              <div
                ref={titleContainerRef}
                className="flex items-center gap-1.5 overflow-hidden flex-wrap"
              >
                {getTitleWords(activeOption).map((word, idx) => (
                  <span
                    key={`${activeOption}-${idx}`}
                    className={`word-item inline-block text-lg md:text-xl font-bold tracking-wide ${
                      word === activeOption
                        ? "text-white"
                        : word === "—"
                        ? "text-[#10b981]"
                        : "text-zinc-400 font-medium text-xs md:text-sm"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Action Link per Tab */}
              {activeOption === "Works" && (
                <button
                  onClick={() => onGoToHomeWork ? onGoToHomeWork() : navigate("/work")}
                  className="text-xs text-[#10b981] hover:text-emerald-400 flex items-center gap-1 font-medium cursor-pointer transition-colors"
                >
                  <span>View All Works</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              {activeOption === "Services" && (
                <button
                  onClick={() => onGoToHomeWork ? onGoToHomeWork() : navigate("/about")}
                  className="text-xs text-[#10b981] hover:text-emerald-400 flex items-center gap-1 font-medium cursor-pointer transition-colors"
                >
                  <span>All 30+ Services</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              {activeOption === "Clients" && (
                <button
                  onClick={() => navigate("/clients")}
                  className="text-xs text-[#10b981] hover:text-emerald-400 flex items-center gap-1 font-medium cursor-pointer transition-colors"
                >
                  <span>View All Clients</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dynamic Tab Body (Content Animated Bottom-to-Top) */}
            <div
              ref={contentContainerRef}
              className="flex-1 overflow-y-auto py-3 pr-1 space-y-3 custom-scrollbar"
            >
              {/* TAB 1: OVERVIEW */}
              {activeOption === "Overview" && (
                <div className="space-y-4">
                  {/* Top Stats Cards Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {overviewStats.map((stat, idx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div
                          key={idx}
                          className="data-anim-item bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex flex-col justify-between hover:border-[#10b981]/50 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-400 font-medium">
                              {stat.label}
                            </span>
                            <StatIcon className="w-4 h-4 text-[#10b981] group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                            {stat.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Core Highlights List */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {overviewHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="data-anim-item bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/90 rounded-xl p-3 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-white">
                            {item.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: WORKS */}
              {activeOption === "Works" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {heroWorks.map((work) => {
                      const isSelected = selectedWorkId === work.id;
                      return (
                        <div
                          key={work.id}
                          onClick={() => setSelectedWorkId(work.id)}
                          className={`data-anim-item p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-zinc-900/90 border-[#10b981] shadow-lg shadow-[#10b981]/10"
                              : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-semibold text-white">
                              {work.company}
                            </h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] font-medium border border-[#10b981]/30">
                              {work.status}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-300 mb-1 font-medium">
                            {work.service}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                            <span>{work.category}</span>
                            <span className="text-zinc-400 italic">
                              {work.impact}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES */}
              {activeOption === "Services" && (
                <div className="space-y-3">
                  {/* Category Pills */}
                  <div className="data-anim-item flex gap-2 border-b border-zinc-800/80 pb-2 overflow-x-auto no-scrollbar">
                    {heroServicesCategories.map((cat) => {
                      const CatIcon = cat.icon;
                      const isActive = selectedServiceCat === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedServiceCat(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#10b981] text-black font-semibold shadow-md"
                              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                          }`}
                        >
                          <CatIcon className="w-3.5 h-3.5" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Category Service List */}
                  {heroServicesCategories
                    .filter((cat) => cat.id === selectedServiceCat)
                    .map((cat) => (
                      <div key={cat.id} className="space-y-2">
                        <div className="data-anim-item text-xs text-zinc-400 font-medium flex items-center justify-between">
                          <span>Key Offerings under {cat.label}</span>
                          <span className="text-[10px] text-[#10b981]">
                            {cat.badge}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {cat.services.map((srv, idx) => (
                            <div
                              key={idx}
                              className="data-anim-item flex items-start gap-2 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/60"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                              <span className="text-xs text-zinc-200 leading-tight">
                                {srv}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* TAB 4: CLIENTS */}
              {activeOption === "Clients" && (
                <div className="space-y-3">
                  {/* Category Pills */}
                  <div className="data-anim-item flex gap-2 border-b border-zinc-800/80 pb-2 overflow-x-auto no-scrollbar">
                    {heroClientCategories.map((cat) => {
                      const CatIcon = cat.icon;
                      const isActive = selectedClientCat === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedClientCat(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#10b981] text-black font-semibold shadow-md"
                              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                          }`}
                        >
                          <CatIcon className="w-3.5 h-3.5" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Client List Grid */}
                  {heroClientCategories
                    .filter((cat) => cat.id === selectedClientCat)
                    .map((cat) => (
                      <div key={cat.id} className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                          {cat.clients.map((client, idx) => (
                            <div
                              key={idx}
                              className="data-anim-item bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-[#10b981]/40 p-2.5 rounded-xl flex items-center gap-2.5 transition-all group"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 group-hover:scale-125 transition-transform" />
                              <span className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                                {client}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  <div className="data-anim-item bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 mt-2">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                      Trusted by 70+ Multinationals & Group Conglomerates
                    </span>
                    <button
                      onClick={() => navigate("/clients")}
                      className="text-[#10b981] hover:underline text-xs font-medium cursor-pointer"
                    >
                      Browse All →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Row inside Right Box */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block"></span>
                <span className="text-zinc-300 font-medium">
                  Chowdhury & Associates
                </span>
              </div>
              <button
                onClick={handlePrimaryCta}
                className="text-[#10b981] hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


