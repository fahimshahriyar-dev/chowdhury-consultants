import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Globe,
  Layers,
  Share2,
  Landmark,
  Pill,
  Shirt,
  Building2,
  Earth,
  MoreHorizontal,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  X,
} from "lucide-react";

interface HomeCompaniesProps {
  active?: boolean;
  onGoToPreviousPage?: () => void;
  onGoToNextPage?: () => void;
}

const stats = [
  { label: "Satisfied Clients", value: "70+", icon: <Users className="w-4 h-4 text-[#10B981]" /> },
  { label: "Years of Trust", value: "25+", icon: <Award className="w-4 h-4 text-[#10B981]" /> },
  { label: "Success Rate", value: "99%", icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" /> },
];

interface CompanyBox {
  id: number;
  title: string;
  icon: React.ReactNode;
  companies: string[];
  visibleCount: number;
}

const boxes: CompanyBox[] = [
  {
    id: 1,
    title: "Multinational Companies",
    icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Grameen Phone Ltd.",
      "Grameenphone IT Ltd.",
      "Holcim Cement (Bangladesh) Ltd.",
      "Bayer Crops Science Limited",
      "Grameen Telecom",
      "Grameen Danone Foods Ltd.",
      "Grameen Distribution Limited",
      "Grameen Shakti Samajik Babosa Limited",
      "Grameen Anergy Limited",
      "Grameen Shakti",
    ],
    visibleCount: 4,
  },
  {
    id: 2,
    title: "Group Companies",
    icon: <Layers className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Baly Group of Company",
      "Nur & Nahar Group of Company",
      "NEN Group of Company",
      "Shafiul Alam Steel Mills Group of Company",
      "Fariha Spinning Mills & Textile Mills Ltd. Group of company",
      "K. Ali Group of Industries",
      "Urmi Group of Company",
      "Ezzy Group of Company",
      "Lucky Group of Company",
      "Shamoli Garments Ltd. Group of Company",
    ],
    visibleCount: 4,
  },
  {
    id: 3,
    title: "100% Foreign Shareholder Company",
    icon: <Share2 className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "The Delegation of European Union",
      "Fullcharm Fashions Knitwear Ltd.",
      "Vanessa Enterprise Ltd.",
      "Scomi Oiltools Limited",
      "Caigle Bangladesh Trading Ltd.",
      "Fucheng Enterprise Ltd.",
      "Xing Sheng (HK) Bangladesh Ltd.",
    ],
    visibleCount: 5,
  },
  {
    id: 4,
    title: "100% Foreign Liaison Office",
    icon: <Landmark className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Triton Textile Limited",
      "VF Asia Limited",
      "Vinarco Services (Thailand) Ltd.",
      "ECOM Agro industrial Asia Pte. Ltd.",
      "Sun fortune Private Ltd.",
      "Consulting Services International Ltd.",
      "Li & Fung (Bangladesh) Ltd.",
    ],
    visibleCount: 5,
  },
  {
    id: 5,
    title: "Pharmaceuticals Companies",
    icon: <Pill className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Rephco Pharmaceuticals Ltd.",
      "Sanofi Aventis Limited",
      "Bangladesh Hospital Services Ltd.",
      "Inbiz Chemotic Limited",
      "Rockea Chemical Ind. Limited",
    ],
    visibleCount: 5,
  },
  {
    id: 6,
    title: "100% Export Oriented Garments Companies",
    icon: <Shirt className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "ASRO Fashion Limited",
      "Doel House Limited",
      "Mercury Knitwear (Pvt.) Ltd.",
      "Mercury Appeals (Pvt.) Limited",
      "Pole Star Apparels (Pvt.) Ltd.",
      "ABR Sweaters Limited",
      "Asia Appeals Manufacturing Co. Limited",
      "Myth Limited",
      "Sungarh Textile Ltd.",
    ],
    visibleCount: 5,
  },
  {
    id: 7,
    title: "Developers Companies",
    icon: <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Jaas Proprieties Limited",
      "Mystical Properties Limited",
      "Nur & Naher Properties Limited",
      "SAS Building Makers Ltd.",
      "SAS Structural Limited",
    ],
    visibleCount: 4,
  },
  {
    id: 8,
    title: "100% Foreign Based Companies",
    icon: <Earth className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Nokia Dhaka Ltd.",
      "Hop Lun (Bangladesh) Ltd.",
      "Reder Certification Services Limited",
      "Procetral & Gamble Bangladesh (Pvt.) Ltd.",
      "Coco Cola Vebarage Ltd.",
      "Gillette Bangladesh (Pvt.) Ltd.",
      "Sony Ericsson Mobile Communications International AB.",
      "World Cat Ltd.",
      "Broadcast Worldwide Ltd.",
      "TVS Interconnect Systems Ltd.",
    ],
    visibleCount: 6,
  },
  {
    id: 9,
    title: "Others Companies",
    icon: <MoreHorizontal className="w-4 h-4 lg:w-5 lg:h-5 text-[#10B981] flex-shrink-0" />,
    companies: [
      "Cross World Limited",
      "Cross World Power Limited",
      "SBS Express International Ltd.",
      "IHT Bangladesh Limited",
      "Shaheen Cable Wire Drawings Ltd.",
      "Farzana Shakil Makeovers Salon Limited",
      "Comilla Consortium Limited",
    ],
    visibleCount: 6,
  },
];

const boxClass =
  "bg-[#F6F7F7] rounded-lg border border-transparent hover:border-zinc-200 transition-colors flex flex-col p-3 md:p-3.5 overflow-hidden";

const HomeCompanies = ({
  active = false,
  onGoToPreviousPage,
  onGoToNextPage,
}: HomeCompaniesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CompanyBox | null>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll("h1 .word") ?? [];
      const statItems = statsRef.current ? Array.from(statsRef.current.children) : [];
      const boxElements = gridRef.current
        ? Array.from(gridRef.current.querySelectorAll("[data-box]")).sort(
            (a, b) => {
              const rectA = a.getBoundingClientRect();
              const rectB = b.getBoundingClientRect();
              return rectA.top - rectB.top || rectA.left - rectB.left;
            },
          )
        : [];
      const boxTitleWords = boxElements.flatMap((box) =>
        Array.from(box.querySelectorAll(".box-word")),
      );
      const boxTitlesByBox = boxElements.map((box) =>
        Array.from(box.querySelectorAll(".box-word")),
      );

      // Initial state matching HomeService
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });

      if (statItems.length > 0) {
        gsap.set(statItems, { y: 30, opacity: 0 });
      }

      if (boxElements.length > 0) {
        gsap.set(boxElements, { y: 60, opacity: 0 });
      }

      if (boxTitleWords.length > 0) {
        gsap.set(boxTitleWords, { y: 16, opacity: 0 });
      }

      if (!active) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Green badge fade in
      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 })
        // 2. Title word by word entrance (matching HomeService exactly)
        .to(
          titleWords,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.4",
        )
        // 3. Stats entrance
        .to(
          statItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        // 4 & 5. Boxes appear top boxes first; each box's title reveals
        // word by word as soon as its box starts to appear
        .addLabel("boxes", "-=0.5")
        .to(
          boxElements,
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
          },
          "boxes"
        );

      boxTitlesByBox.forEach((words, i) => {
        tl.to(
          words,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          `boxes+=${i * 0.12 + 0.15}`
        );
      });
    }, section1Ref);

    return () => ctx.revert();
  }, [active]);

  // Handle Wheel navigation inside Companies section
  useEffect(() => {
    const container = section1Ref.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -15) {
        onGoToPreviousPage?.();
      } else if (e.deltaY > 15) {
        onGoToNextPage?.();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [onGoToPreviousPage, onGoToNextPage]);

  return (
    <div
      id="companies-scroll"
      className="relative w-full h-screen overflow-hidden bg-[#FEFEFE] pt-20 pb-8 px-4 md:px-12 lg:px-20 flex flex-col"
    >
      <section ref={section1Ref} className="container mx-auto max-w-[1400px] flex flex-col h-full">
        {/* Header - Matching HomeService animation & layout */}
        <div className="pb-4 text-center flex flex-col items-center flex-shrink-0">
          <div ref={titleRef} className="flex flex-col items-center">
            {/* Green Bullet Point + Text */}
            <div
              ref={headerBadgeRef}
              className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              <span>Trusted connections</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4">
              {"Our Client Network".split(" ").map((word, i) => (
                <span key={i} className="inline-block pb-1">
                  <span className="word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Quick Metrics Bar */}
          <div ref={statsRef} className="flex items-center justify-center gap-6 mt-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#F6F7F7] px-4 py-1.5 rounded-full border border-zinc-200/60">
                {stat.icon}
                <span className="text-xs font-bold text-black">{stat.value}</span>
                <span className="text-xs text-zinc-500 font-normal">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid layout matching the exact reference image */}
        <div
          ref={gridRef}
          className="w-full flex-1 min-h-0 grid grid-cols-12 gap-[18px] pt-2 pb-4 grid-rows-[4fr_3fr_4fr]"
        >
          {/* Box 1 - top left, short */}
          <div data-box className={`${boxClass} col-start-1 col-span-4 row-start-1`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[0].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[0].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[0].companies.slice(0, boxes[0].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[0].companies.length > boxes[0].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[0])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[0].companies.length - boxes[0].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[0])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 2 - top, next to Box 1, short */}
          <div data-box className={`${boxClass} col-start-5 col-span-4 row-start-1`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[1].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[1].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[1].companies.slice(0, boxes[1].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[1].companies.length > boxes[1].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[1])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[1].companies.length - boxes[1].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[1])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 3 - top right, tall (spans row 1 + row 2) */}
          <div data-box className={`${boxClass} col-start-9 col-span-2 row-start-1 row-span-2`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[2].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[2].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[2].companies.slice(0, boxes[2].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[2].companies.length > boxes[2].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[2])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[2].companies.length - boxes[2].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[2])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 4 - far top right, tall (spans row 1 + row 2) */}
          <div data-box className={`${boxClass} col-start-11 col-span-2 row-start-1 row-span-2`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[3].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[3].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[3].companies.slice(0, boxes[3].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[3].companies.length > boxes[3].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[3])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[3].companies.length - boxes[3].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[3])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 5 - left, tall (spans row 2 + row 3) */}
          <div data-box className={`${boxClass} col-start-1 col-span-2 row-start-2 row-span-2`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[4].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[4].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[4].companies.slice(0, boxes[4].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[4].companies.length > boxes[4].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[4])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[4].companies.length - boxes[4].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[4])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 6 - next to Box 5, tall (spans row 2 + row 3) */}
          <div data-box className={`${boxClass} col-start-3 col-span-2 row-start-2 row-span-2`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[5].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[5].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[5].companies.slice(0, boxes[5].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[5].companies.length > boxes[5].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[5])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[5].companies.length - boxes[5].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[5])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 7 - middle, short (row 2 only) */}
          <div data-box className={`${boxClass} col-start-5 col-span-4 row-start-2`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[6].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[6].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[6].companies.slice(0, boxes[6].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[6].companies.length > boxes[6].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[6])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[6].companies.length - boxes[6].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[6])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 8 - bottom, under Box 7, short */}
          <div data-box className={`${boxClass} col-start-5 col-span-4 row-start-3`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[7].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[7].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[7].companies.slice(0, boxes[7].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[7].companies.length > boxes[7].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[7])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[7].companies.length - boxes[7].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[7])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Box 9 - bottom right, under Box 3/4, short */}
          <div data-box className={`${boxClass} col-start-9 col-span-4 row-start-3`}>
            <div className="flex items-center gap-1.5 min-w-0">
              {boxes[8].icon}
              <h3 className="text-sm md:text-[15px] font-bold text-black tracking-tight leading-tight flex flex-wrap gap-x-1.5">
                {boxes[8].title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    <span className="box-word inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {boxes[8].companies.slice(0, boxes[8].visibleCount).map((name, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-zinc-600 border border-zinc-200/80 max-w-full leading-snug"
                >
                  {name}
                </span>
              ))}
              {boxes[8].companies.length > boxes[8].visibleCount && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(boxes[8])}
                  className="rounded-full px-2 py-0.5 text-xs sm:text-[13px] lg:text-sm text-[#10B981] font-semibold whitespace-nowrap leading-snug cursor-pointer hover:underline"
                >
                  +{boxes[8].companies.length - boxes[8].visibleCount} more
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(boxes[8])}
              className="mt-auto pt-2.5 flex items-center gap-1 text-xs md:text-sm font-semibold text-black group cursor-pointer text-left"
            >
              See all
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* Company Details Popup Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                {selectedCategory.icon}
                <h3 className="text-lg md:text-xl font-bold text-black tracking-tight">
                  {selectedCategory.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto py-5 px-1">
              <p className="text-xs text-zinc-400 mb-3 font-medium">
                {selectedCategory.companies.length} Total Companies:
              </p>
              <div className="flex flex-col gap-2">
                {selectedCategory.companies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-sm font-medium text-zinc-800 flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCompanies;