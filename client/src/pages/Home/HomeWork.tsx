import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import WorkModal, { type WorkItem } from "../../components/WorkModal";

interface WorkProps {
  active?: boolean;
  bullet?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  showSeeMore?: boolean;
}

const workData: WorkItem[] = [
  {
    id: 1,
    company: "Apex Holdings Ltd.",
    service: "Income Tax Advisory & Filing",
    images: [
      "https://picsum.photos/seed/work1_1/600/400",
      "https://picsum.photos/seed/work1_2/600/400",
      "https://picsum.photos/seed/work1_3/600/400",
      "https://picsum.photos/seed/work1_4/600/400",
      "https://picsum.photos/seed/work1_5/600/400",
    ],
  },
  {
    id: 2,
    company: "Grameen Telecom",
    service: "Corporate Audit & VAT Compliance",
    images: [
      "https://picsum.photos/seed/work2_1/600/400",
      "https://picsum.photos/seed/work2_2/600/400",
      "https://picsum.photos/seed/work2_3/600/400",
      "https://picsum.photos/seed/work2_4/600/400",
    ],
  },
  {
    id: 3,
    company: "Beximco Pharma",
    service: "Financial Restructuring & Advisory",
    images: [
      "https://picsum.photos/seed/work3_1/600/400",
      "https://picsum.photos/seed/work3_2/600/400",
      "https://picsum.photos/seed/work3_3/600/400",
    ],
  },
  {
    id: 4,
    company: "Square Group",
    service: "Tax Assessment & Appellate Representation",
    images: [
      "https://picsum.photos/seed/work4_1/600/400",
      "https://picsum.photos/seed/work4_2/600/400",
      "https://picsum.photos/seed/work4_3/600/400",
      "https://picsum.photos/seed/work4_4/600/400",
      "https://picsum.photos/seed/work4_5/600/400",
      "https://picsum.photos/seed/work4_6/600/400",
    ],
  },
  {
    id: 5,
    company: "Brac Bank",
    service: "Regulatory Compliance & Risk Assessment",
    images: [
      "https://picsum.photos/seed/work5_1/600/400",
      "https://picsum.photos/seed/work5_2/600/400",
      "https://picsum.photos/seed/work5_3/600/400",
      "https://picsum.photos/seed/work5_4/600/400",
    ],
  },
  {
    id: 6,
    company: "Walton Hi-Tech",
    service: "Transfer Pricing & Legal Consultancy",
    images: [
      "https://picsum.photos/seed/work6_1/600/400",
      "https://picsum.photos/seed/work6_2/600/400",
      "https://picsum.photos/seed/work6_3/600/400",
      "https://picsum.photos/seed/work6_4/600/400",
      "https://picsum.photos/seed/work6_5/600/400",
    ],
  },
  {
    id: 7,
    company: "City Group",
    service: "Corporate Tax Return & Advisory",
    images: [
      "https://picsum.photos/seed/work7_1/600/400",
      "https://picsum.photos/seed/work7_2/600/400",
      "https://picsum.photos/seed/work7_3/600/400",
    ],
  },
  {
    id: 8,
    company: "United Group",
    service: "Asset Valuation & Tax Planning",
    images: [
      "https://picsum.photos/seed/work8_1/600/400",
      "https://picsum.photos/seed/work8_2/600/400",
      "https://picsum.photos/seed/work8_3/600/400",
      "https://picsum.photos/seed/work8_4/600/400",
      "https://picsum.photos/seed/work8_5/600/400",
    ],
  },
  {
    id: 9,
    company: "PRAN-RFL Group",
    service: "VAT Audit & Compliance",
    images: [
      "https://picsum.photos/seed/work9_1/600/400",
      "https://picsum.photos/seed/work9_2/600/400",
      "https://picsum.photos/seed/work9_3/600/400",
      "https://picsum.photos/seed/work9_4/600/400",
    ],
  },
  {
    id: 10,
    company: "Meghna Group of Industries",
    service: "Corporate Tax & Strategic Planning",
    images: [
      "https://picsum.photos/seed/work10_1/600/400",
      "https://picsum.photos/seed/work10_2/600/400",
      "https://picsum.photos/seed/work10_3/600/400",
      "https://picsum.photos/seed/work10_4/600/400",
      "https://picsum.photos/seed/work10_5/600/400",
    ],
  },
  {
    id: 11,
    company: "BRAC",
    service: "Financial Due Diligence & Advisory",
    images: [
      "https://picsum.photos/seed/work11_1/600/400",
      "https://picsum.photos/seed/work11_2/600/400",
      "https://picsum.photos/seed/work11_3/600/400",
    ],
  },
  {
    id: 12,
    company: "Bashundhara Group",
    service: "Income Tax & Regulatory Compliance",
    images: [
      "https://picsum.photos/seed/work12_1/600/400",
      "https://picsum.photos/seed/work12_2/600/400",
      "https://picsum.photos/seed/work12_3/600/400",
      "https://picsum.photos/seed/work12_4/600/400",
    ],
  },
  {
    id: 13,
    company: "Akij Group",
    service: "Transfer Pricing Documentation & Advisory",
    images: [
      "https://picsum.photos/seed/work13_1/600/400",
      "https://picsum.photos/seed/work13_2/600/400",
      "https://picsum.photos/seed/work13_3/600/400",
      "https://picsum.photos/seed/work13_4/600/400",
      "https://picsum.photos/seed/work13_5/600/400",
    ],
  },
];

const HomeWork = ({
  active = false,
  bullet = "Excellence in practice",
  title = "Our Work Showcase",
  subtitle = "Top 8 highlights",
  limit = 8,
  showSeeMore = true,
}: WorkProps) => {
  const section1Ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll("h1 .word") ?? [];

      // Initial state matching About header animations
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
      gsap.set(subtitleRef.current, { y: 60, opacity: 0 });

      // Cards staggered reveal initial state
      const cardElements = gridRef.current
        ? Array.from(gridRef.current.children)
        : [];
      gsap.set(cardElements, { y: 60, opacity: 0 });

      if (!active) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Green badge fade in
      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 })
        // 2. Title word by word entrance
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
        // 3. Subtitle entrance
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.1 }, "-=0.8")
        // 4. Cards staggered entrance from bottom to top starting at the same time as subtitle
        .to(
          cardElements,
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.8",
        );
    }, section1Ref);

    return () => ctx.revert();
  }, [active]);

  const openModal = (work: WorkItem, startIndex = 0) => {
    setSelectedWork(work);
    setSelectedImageIndex(startIndex);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  return (
    <div
      id="work-scroll"
      className="relative w-full min-h-screen bg-[#FEFEFE] py-20 px-4 md:px-12 lg:px-24"
    >
      <section ref={section1Ref} className="container mx-auto max-w-7xl">
        {/* Header - Matching About.tsx design & structure */}
        <div className="pb-16 text-center flex flex-col items-center">
          <div ref={titleRef} className="flex flex-col items-center">
            <div
              ref={headerBadgeRef}
              className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              <span>{bullet}</span>
            </div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4">
              {title.split(" ").map((word, i) => (
                <span key={i} className="inline-block pb-1">
                  <span className="word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          {subtitle && (
            <p
              ref={subtitleRef}
              className="mt-3 text-zinc-500 text-sm md:text-xl tracking-normal font-normal"
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {workData.slice(0, limit).map((work) => {
            const extraCount = work.images.length - 3;
            return (
              <div
                key={work.id}
                className="bg-[#F8F9FA] border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 will-change-transform"
              >
                {/* Header: Company & Service */}
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight mb-2">
                    {work.company}
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm leading-snug px-2">
                    {work.service}
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-full border-t border-zinc-200 mb-6"></div>

                {/* White Box for Images (2x2 Grid with divider lines) */}
                <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden grid grid-cols-2 grid-rows-2 divide-x divide-y divide-zinc-200 aspect-square">
                  {/* Image 1 */}
                  <div
                    onClick={() => openModal(work, 0)}
                    className="relative cursor-pointer overflow-hidden group"
                  >
                    <img
                      src={work.images[0]}
                      alt={`${work.company} 1`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Image 2 */}
                  <div
                    onClick={() => openModal(work, 1)}
                    className="relative cursor-pointer overflow-hidden group"
                  >
                    {work.images[1] ? (
                      <img
                        src={work.images[1]}
                        alt={`${work.company} 2`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-zinc-50 w-full h-full" />
                    )}
                  </div>

                  {/* Image 3 */}
                  <div
                    onClick={() => openModal(work, 2)}
                    className="relative cursor-pointer overflow-hidden group"
                  >
                    {work.images[2] ? (
                      <img
                        src={work.images[2]}
                        alt={`${work.company} 3`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-zinc-50 w-full h-full" />
                    )}
                  </div>

                  {/* Image 4 / More Image Button */}
                  <div className="relative overflow-hidden bg-zinc-50 flex items-center justify-center">
                    {extraCount > 0 ? (
                      <button
                        onClick={() => openModal(work, 3)}
                        className="w-full h-full bg-zinc-900/5 hover:bg-zinc-900/10 flex flex-col items-center justify-center p-2 text-center transition-colors group cursor-pointer"
                      >
                        <span className="text-base font-bold text-black group-hover:scale-105 transition-transform">
                          {extraCount}+ see all
                        </span>
                      </button>
                    ) : work.images[3] ? (
                      <div
                        onClick={() => openModal(work, 3)}
                        className="w-full h-full cursor-pointer group"
                      >
                        <img
                          src={work.images[3]}
                          alt={`${work.company} 4`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="bg-zinc-50 w-full h-full" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {showSeeMore && (
          <button className="group mt-16 mx-auto flex flex-col items-center gap-1 text-black">
            <span className="text-base md:text-lg font-semibold">
              See more
            </span>
            <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
          </button>
        )}
      </section>

      {/* Work Popup Modal */}
      <WorkModal
        work={selectedWork}
        initialIndex={selectedImageIndex}
        onClose={closeModal}
      />
    </div>
  );
};

export default HomeWork;