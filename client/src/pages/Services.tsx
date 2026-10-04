import React, { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Building2,
  Building,
  UserCheck,
  Briefcase,
  Search,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import heroBg from "../assets/images/hero_bg.png";

// Service Category Data
interface ServiceCategory {
  id: string;
  badge: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  services: string[];
  executives?: string[];
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "corporate",
    badge: "Corporate & Foreign Investment",
    title: "Local, Multinational & Joint Venture Company Services",
    shortDesc:
      "Comprehensive secretarial, corporate taxation, NBR exemptions, RJSC filings, and legal compliance.",
    icon: Building2,
    services: [
      "Secretarial Works (RJSC)",
      "Trade License",
      "Chamber of Commerce Membership",
      "IRC & ERC registration & renewal",
      "VAT registration (Local & Import)",
      "Trade Mark, Patents registration",
      "BOI registration / Enlistment",
      "Corporate Tax Service",
      "Corporate VAT service",
      "Tax exemption from NBR",
      "Company’s Accounting service",
      "Company’s Quarterly accounts service",
      "Tax Holiday permission from NBR",
      "Bonded warehouse License",
      "Labor Court permission approval / renewal",
      "BSTI Registration",
      "Legal Service of Court",
      "Provident Fund approval from NBR",
      "Gratuity Fund approval from NBR",
      "Pension Fund approval from NBR",
      "Workers PP Fund approval from NBR",
    ],
  },
  {
    id: "branch",
    badge: "Liaison & Branch Offices",
    title: "Liaison & Branch Office (Local & Foreign) Advisory",
    shortDesc:
      "End-to-end BIDA/BOI approvals, 18B BB permissions, foreign exchange compliance, and audit.",
    icon: Building,
    services: [
      "Liaison / Branch Office BOI Permission",
      "18B permission from Bangladesh Bank",
      "Annual Permission renewal",
      "Quarterly accounts service",
      "Corporate Tax Service",
      "Corporate VAT service",
      "Company’s other legal matters",
    ],
    executives: [
      "Md. Wahab Hossain Chowdhury (CA CC, ITP)",
      "Advocate Md. Shahidul Islam Chowdhury (M.A. LLB)",
      "Md. Moniruzzaman, FCA",
      "Md. Humayun Kabir, FCA",
      "Nur-E-Alam Siddique, ACA",
      "Sk. Al Mamun Hossain",
      "Md. Shamim Hossain",
      "Md. Juwel Akram Ripon",
      "Sumon Sarker",
      "Md. Bayazid",
      "Md. Zulfikar Hossain",
      "Md. Imran Hossain",
    ],
  },
  {
    id: "individual",
    badge: "Individual & Expatriate",
    title: "Individual (Local & Foreign National) Advisory",
    shortDesc:
      "Work permits, E-Visas, security clearances, salary tax assessments, and expatriate compliance.",
    icon: UserCheck,
    services: [
      "“E” Visa recommendation",
      "Work permit approval & renewal",
      "Multiple Visa permission / Renewal",
      "Security clearance of foreign national",
      "Salary Tax computation",
      "Employee’s Tax assessment & filing",
      "Expatriate legal & tax advisory",
    ],
  },
  {
    id: "partnership",
    badge: "Proprietorship & Partnership",
    title: "Sole Proprietorship & Partnership Firm Solutions",
    shortDesc:
      "Partnership deed registration, trade license, VAT/Tax registration, and Chamber of Commerce filings.",
    icon: Briefcase,
    services: [
      "Partnership deed drafting & registration",
      "Partnership registration with RJSC",
      "Trade License setup & renewal",
      "Chamber of Commerce Membership",
      "IRC & ERC registration",
      "VAT registration (Local & Import)",
      "Trade Mark & Patents registration",
      "BOI registration / Enlistment",
      "Tax & VAT Service",
      "Tax exemption from NBR",
      "Business legal advisory",
    ],
  },
];

const stats = [
  { value: "46+", label: "Advisory Services", icon: FileCheck },
  { value: "25+", label: "Years of Trust", icon: Award },
  { value: "70+", label: "Corporate Clients", icon: Users },
  { value: "2100+", label: "Individual Clients", icon: ShieldCheck },
];

const Services: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
      );

      const cards = cardsContainerRef.current?.querySelectorAll(".service-category-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [selectedCat, searchQuery]);

  // Filtered categories & items calculation
  const filteredCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const isCatMatch =
        selectedCat === "all" || selectedCat === cat.id;

      if (!isCatMatch) return null;

      if (!searchQuery.trim()) return cat;

      const q = searchQuery.toLowerCase();
      const matchedServices = cat.services.filter((s) =>
        s.toLowerCase().includes(q)
      );
      const isTitleMatch =
        cat.title.toLowerCase().includes(q) ||
        cat.badge.toLowerCase().includes(q) ||
        cat.shortDesc.toLowerCase().includes(q);

      if (isTitleMatch || matchedServices.length > 0) {
        return {
          ...cat,
          services: matchedServices.length > 0 ? matchedServices : cat.services,
        };
      }

      return null;
    }).filter(Boolean) as ServiceCategory[];
  }, [selectedCat, searchQuery]);

  const totalServicesCount = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => acc + cat.services.length, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-black flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-8 lg:px-12 pt-20 md:pt-20 pb-20 max-w-7xl">
        {/* Header Hero Section */}
        <div ref={headerRef} className="text-center flex flex-col items-center max-w-4xl mx-auto mb-12">
          {/* Green Bullet Badge matching Work.tsx */}
          <div className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span>Expert Consultancy & Advisory Practice</span>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight mb-4">
            Comprehensive Corporate, Tax & Legal Services
          </h1>

          {/* Quick Stats — pill badges matching HomeCompanies style */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-[#F6F7F7] px-4 py-1.5 rounded-full border border-zinc-200/60"
                >
                  <Icon className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-bold text-black">{st.value}</span>
                  <span className="text-xs text-zinc-500 font-normal">{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                selectedCat === "all"
                  ? "bg-black text-white shadow-md"
                  : "bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200"
              }`}
            >
              All Domains ({totalServicesCount})
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200"
                  }`}
                >
                  <span>{cat.badge}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    {cat.services.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. VAT, BOI)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 text-xs md:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors bg-white shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Showcase Cards Grid */}
        {filteredCategories.length > 0 ? (
          <div ref={cardsContainerRef} className="space-y-12">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="service-category-card bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  {/* Category Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#10B981] mb-1">
                          {cat.badge}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
                          {cat.title}
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-500 mt-1 max-w-2xl">
                          {cat.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-700 font-semibold text-xs rounded-full">
                        {cat.services.length} Services
                      </span>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cat.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 bg-zinc-50/80 border border-zinc-100 rounded-2xl"
                        >
                          <span className="text-xs md:text-sm font-semibold text-zinc-800 leading-snug">
                            <span className="text-[#10B981] font-bold mr-1.5">
                              {idx + 1}.
                            </span>
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Executives List (For Branch & Liaison Offices) */}
                  {cat.executives && cat.executives.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-zinc-100 bg-zinc-50/50 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-3">
                        <Users className="w-4 h-4 text-[#10B981]" />
                        <span>Assigned Advisory Partners & Key Executives</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.executives.map((exec, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/80 text-xs font-medium text-zinc-700 shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            {exec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-zinc-50 rounded-3xl border border-zinc-200/80">
            <Search className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-black mb-1">
              No matching services found
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 mb-4 max-w-sm mx-auto">
              We couldn't find any service matching "{searchQuery}". Try searching for keywords like "Tax", "VAT", "BOI", "RJSC" or "Visa".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("all");
              }}
              className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Appointment Callout Banner at Bottom */}
        <div
          className="mt-16 text-white rounded-3xl p-12 md:p-20 min-h-[260px] md:min-h-[320px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Subtle Ambient Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#10B981] font-semibold text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Corporate Consultancy</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Need Assistance with Tax, VAT or RJSC Filings?
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Schedule a direct consultation with our managing partner and senior advocates to streamline your corporate compliance.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/appointment"
              className="px-6 py-3.5 bg-[#10B981] hover:bg-emerald-400 text-black font-bold text-xs md:text-sm rounded-xl transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
