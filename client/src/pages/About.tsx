import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { UserRound } from "lucide-react";
import Navbar from "../components/Navbar";
import founderImg from "../assets/images/Md_Wahab_Hossain_Chowdhury.png";

// ─── Member data ───────────────────────────────────────────────────────────────
interface Member {
  badge: string;
  name: string;
  image: string | null;
  // sectionBadge: green bullet text above the paragraphs
  sectionBadge?: string;
  firmInfo?: { name: string; established: string };
  paragraphs: string[];
  // imageLeft: if true the image column renders on the left
  imageLeft?: boolean;
}

const MEMBERS: Member[] = [
  {
    badge: "Our founder & managing partner",
    name: "Md. Wahab Hossain Chowdhury",
    image: founderImg,
    imageLeft: true,
    sectionBadge: "CA(CC) ITP",
    paragraphs: [
      "Md. Wahab Hossain Chowdhury is a distinguished Chartered Accountant (CC) and Income Tax Practitioner (ITP) with over two decades of unwavering commitment to professional excellence.",
      "He founded Chowdhury Consultants in 2001 with a vision to deliver world-class audit, taxation, and advisory services to a diverse clientele spanning the public sector, private enterprises, and sole proprietorships across Bangladesh.",
      "Under his leadership the firm has grown into a trusted partner for clients seeking integrity-driven, practical, and results-oriented financial solutions.",
    ],
  },
  {
    badge: "Our partner",
    name: "Md. Shahidul Islam Chowdhury",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=650&fit=crop",
    sectionBadge: "M.A. LLB Advocate, Judge Court, Dhaka",
    paragraphs: [
      "Md. Shahidul Islam Chowdhury is a highly respected legal practitioner and Partner at Chowdhury Consultants, bringing a wealth of expertise in corporate and commercial law.",
      "Holding a Master of Arts and a Bachelor of Laws (LLB), he is an enrolled Advocate at the Judge Court, Dhaka, where he has represented clients across a broad spectrum of civil, corporate, and regulatory matters.",
      "His legal acumen strengthens the firm's advisory capacity, ensuring that clients receive sound, compliant, and strategically informed guidance on all legal and regulatory fronts.",
    ],
  },
  {
    badge: "Partner",
    name: "Nasrin Akter",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=650&fit=crop",
    paragraphs: [
      "Ms. Akter brings extensive expertise in corporate taxation and VAT advisory, helping organisations navigate Bangladesh's evolving fiscal landscape.",
      "She is instrumental in designing tax-efficient structures and has successfully represented numerous clients before the National Board of Revenue.",
    ],
  },
  {
    badge: "Partner",
    name: "Md. Shahidul Islam",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=650&fit=crop",
    paragraphs: [
      "Mr. Shahidul Islam specialises in statutory audit and financial reporting under IFRS and BFRS, serving listed companies and large conglomerates.",
      "He leads the firm's quality-control framework, ensuring that every engagement meets the highest standards of professional excellence.",
    ],
  },
  {
    badge: "Associate partner",
    name: "Farhana Hossain",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=650&fit=crop",
    paragraphs: [
      "Ms. Hossain focuses on management consulting and internal audit, helping clients strengthen governance, risk management, and operational efficiency.",
      "She has led transformative advisory projects across banking, manufacturing, and the NGO sector over her career.",
    ],
  },
  {
    badge: "Associate partner",
    name: "Tanvir Ahmed Chowdhury",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=650&fit=crop",
    paragraphs: [
      "Mr. Tanvir Ahmed Chowdhury brings deep knowledge in corporate secretarial services, company law, and regulatory filings with RJSC.",
      "He advises clients on incorporation, restructuring, and compliance with the Companies Act, ensuring seamless interaction with regulators.",
    ],
  },
];

// ─── Placeholder avatar ────────────────────────────────────────────────────────
const AvatarPlaceholder = () => (
  <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center rounded-3xl select-none gap-3">
    <UserRound className="w-24 h-24 text-zinc-300" strokeWidth={1} />
    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
      Photo coming soon
    </span>
  </div>
);

// ─── Single member section ─────────────────────────────────────────────────────
interface MemberSectionProps {
  member: Member;
  index: number;
  isActive: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
}

const MemberSection = ({
  member,
  index,
  isActive,
  setSectionRef,
}: MemberSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSectionRef(sectionRef.current);
  }, [setSectionRef]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll(".word") ?? [];

      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
      if (subtitleRef.current)
        gsap.set(subtitleRef.current, { y: 60, opacity: 0 });

      const leftItems = paragraphsRef.current
        ? Array.from(paragraphsRef.current.children)
        : [];
      gsap.set(leftItems, { y: 50, opacity: 0 });
      gsap.set(boxRef.current, { y: 200, opacity: 0 });
      if (imageRef.current) gsap.set(imageRef.current, { scale: 1.4 });

      if (!isActive) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 }).to(
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
      );

      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          { y: 0, opacity: 1, duration: 1.1 },
          "-=0.8",
        );
      }

      tl.to(boxRef.current, { y: 0, opacity: 1, duration: 1.4 }, "-=0.6").to(
        imageRef.current,
        { scale: 1, duration: 1.4, ease: "power2.out" },
        "<",
      );

      tl.to(
        leftItems,
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.25, ease: "power3.out" },
        "-=0.9",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="relative container w-full h-screen snap-start flex flex-col overflow-hidden bg-[#FEFEFE]"
    >
      {/* Top header — centered, same as HomeAbout */}
      <div className="pt-20 pb-12 text-center flex flex-col items-center">
        <div ref={titleRef} className="flex flex-col items-center">
          <div
            ref={headerBadgeRef}
            className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span className="capitalize">{member.badge}</span>
          </div>
          <h1 className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4">
            {member.name.split(" ").map((word, i) => (
              <span key={i} className="inline-block pb-1">
                <span className="word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Content — image left when imageLeft=true, otherwise text left / image right */}
      <div
        className={`relative z-10 w-full flex flex-col ${
          member.imageLeft ? "lg:flex-row" : "lg:flex-row"
        } items-center justify-between gap-6 ${index < 2 ? "px-50" : "px-40"}`}
      >
        {/* Image column — rendered first when imageLeft=true */}
        {member.imageLeft && (
          <div
            ref={boxRef}
            className="w-[550px] h-[600px] rounded-3xl overflow-hidden shadow-sm flex-shrink-0"
          >
            <div className="bg-zinc-100 w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
              {member.image ? (
                <img
                  ref={imageRef}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <AvatarPlaceholder />
              )}
            </div>
          </div>
        )}

        {/* Text column */}
        <div
          ref={paragraphsRef}
          className="max-w-xl text-left flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span>{member.sectionBadge ?? "Our Firm at a Glance"}</span>
          </div>
          {member.firmInfo && (
            <div className="flex gap-1 items-end text-zinc-600 text-sm md:text-[18px]">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                {member.firmInfo.name}
              </h2>
              <span>{member.firmInfo.established}</span>
            </div>
          )}
          {member.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-zinc-600 text-sm md:text-[18px] leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Image column — rendered last when imageLeft=false (default) */}
        {!member.imageLeft && (
          <div
            ref={boxRef}
            className="w-[550px] h-[600px] rounded-3xl overflow-hidden shadow-sm flex-shrink-0"
          >
            <div className="bg-zinc-100 w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
              {member.image ? (
                <img
                  ref={imageRef}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <AvatarPlaceholder />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Dot navigator ─────────────────────────────────────────────────────────────
const ScrollDots = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-3">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        aria-label={`Go to member ${i + 1}`}
        className="group flex items-center justify-end gap-2 cursor-pointer"
      >
        <span
          className={`text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 ${
            i === active ? "opacity-100 text-black" : "opacity-0 text-zinc-400"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <span
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? "w-2.5 h-2.5 bg-[#10B981]"
              : "w-1.5 h-1.5 bg-zinc-300 group-hover:bg-zinc-400"
          }`}
        />
      </button>
    ))}
  </div>
);

// ─── Slider Item Data ─────────────────────────────────────────────────────────
interface SliderPerson {
  name: string;
  sectionBadge: string;
  image: string | null;
  paragraphs: string[];
}

const EXECUTIVES: SliderPerson[] = [
  {
    name: "Md. Moniruzzaman",
    sectionBadge: "FCA",
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Moniruzzaman is a Fellow Chartered Accountant (FCA) with comprehensive experience in audit, risk advisory, and financial management.",
      "He plays a pivotal role in maintaining auditing excellence and delivering tailored financial consultancy for enterprise clients.",
    ],
  },
  {
    name: "Md. Humayun Kabir",
    sectionBadge: "FCA",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Humayun Kabir is a Fellow Chartered Accountant (FCA) specialising in corporate taxation, direct and indirect tax strategies, and regulatory compliance.",
      "His strategic guidance helps businesses optimise tax obligations while staying aligned with changing tax framework requirements.",
    ],
  },
  {
    name: "Nur-E-Alam Siddique",
    sectionBadge: "ACA",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&h=650&fit=crop",
    paragraphs: [
      "Nur-E-Alam Siddique is an Associate Chartered Accountant (ACA) dedicated to statutory audit, corporate assurance, and business valuation.",
      "He contributes extensively to financial oversight, corporate reporting accuracy, and advisory services across multiple industry sectors.",
    ],
  },
];

const MANAGERS: SliderPerson[] = [
  {
    name: "Sk. Al Mamun Hossain",
    sectionBadge: "CA(CC) ITP",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=650&fit=crop",
    paragraphs: [
      "Sk. Al Mamun Hossain is a qualified CA(CC) and Income Tax Practitioner (ITP) managing complex audit and taxation engagements.",
      "He ensures client operations remain fully compliant with statutory regulations while providing actionable financial insights.",
    ],
  },
  {
    name: "Md. Shamim Hossain",
    sectionBadge: "CA(CC) ITP",
    image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Shamim Hossain is an experienced CA(CC) and Income Tax Practitioner (ITP) overseeing tax compliance and financial reporting.",
      "He assists organisations in streamlining their fiscal workflows and implementing effective corporate governance practices.",
    ],
  },
  {
    name: "Md. Juwel Akram Ripo",
    sectionBadge: "ITP",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Juwel Akram Ripo is an Income Tax Practitioner (ITP) with specialized expertise in tax filing, assessments, and dispute resolution.",
      "He supports businesses and individual clients across Bangladesh in navigating complex tax environments efficiently.",
    ],
  },
];

const ASSISTANT_MANAGERS: SliderPerson[] = [
  {
    name: "Md. Sumon Sarker",
    sectionBadge: "Assistant manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Sumon Sarker plays a key role as Assistant Manager in audit field operations and financial reporting supervision.",
      "He works closely with client teams to ensure accurate document compilation and operational transparency.",
    ],
  },
  {
    name: "Md. Bayazid",
    sectionBadge: "Assistant manager",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Bayazid contributes as Assistant Manager to corporate compliance, tax assessment support, and internal control reviews.",
      "His attention to detail strengthens engagement quality across varied client portfolios.",
    ],
  },
  {
    name: "Md. Zulfikar Hossain",
    sectionBadge: "Assistant manager",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Zulfikar Hossain works as Assistant Manager focusing on assurance engagements and statutory filings.",
      "He facilitates efficient audit execution and supports client advisory requirements.",
    ],
  },
];

const SUPPORT_STAFFS: SliderPerson[] = [
  {
    name: "Md. Imran Hossain",
    sectionBadge: "support staff",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&h=650&fit=crop",
    paragraphs: [
      "Md. Imran Hossain provides essential operational and administrative support for daily office workflow.",
      "He assists the team with documentation management, client correspondence, and logistics coordination.",
    ],
  },
  {
    name: "Mrs. Sahana Begum",
    sectionBadge: "support staff",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=650&fit=crop",
    paragraphs: [
      "Mrs. Sahana Begum manages administrative services and operational routines within the firm.",
      "She ensures smooth daily functioning and supports administrative efficiency across all departments.",
    ],
  },
  {
    name: "Mrs. Taslima Akhter",
    sectionBadge: "support staff",
    image: "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?w=600&h=650&fit=crop",
    paragraphs: [
      "Mrs. Taslima Akhter handles records management, document processing, and office coordination.",
      "Her dedicated support contributes to seamless communication and internal administrative workflow.",
    ],
  },
];

// ─── Reusable Slider Section (Used for Section 3, 4, 5 & 6) ───────────────────
interface SliderSectionProps {
  badgeTitle: string;
  items: SliderPerson[];
  isActive: boolean;
  setSectionRef: (el: HTMLElement | null) => void;
}

const SliderSection = ({
  badgeTitle,
  items,
  isActive,
  setSectionRef,
}: SliderSectionProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const selectedPerson = items[selectedIdx];

  useEffect(() => {
    setSectionRef(sectionRef.current);
  }, [setSectionRef]);

  // Initial Section Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll(".word") ?? [];
      const rightItems = rightSideRef.current?.children ?? [];
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
      gsap.set(leftSideRef.current, {
        y: 200,
        opacity: 0,
        scale: 1.4,
        transformOrigin: "center center",
      });
      gsap.set(rightItems, { y: 50, opacity: 0 });

      if (!isActive) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 }).to(
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
      );

      tl.to(
        leftSideRef.current,
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=0.8",
      ).to(
        rightItems,
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.2, ease: "power3.out" },
        "<+=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  // Content and Title swap animation when selecting another person
  useEffect(() => {
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { y: 40, opacity: 0, scale: 1.2 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }

    if (rightSideRef.current) {
      gsap.fromTo(
        rightSideRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, [selectedIdx]);

  return (
    <section
      ref={sectionRef}
      className="relative container w-full h-screen snap-start flex flex-col overflow-hidden bg-[#FEFEFE]"
    >
      {/* Top Header */}
      <div className="pt-20 pb-12 text-center flex flex-col items-center">
        <div ref={titleRef} className="flex flex-col items-center">
          <div
            ref={headerBadgeRef}
            className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span className="capitalize">{badgeTitle}</span>
          </div>
          <h1
            key={selectedPerson.name}
            className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4"
          >
            {selectedPerson.name.split(" ").map((word, i) => (
              <span key={i} className="inline-block pb-1">
                <span className="word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-40">
        {/* Left Side: Photo Cards Slider */}
        <div ref={leftSideRef} className="flex items-end gap-6 flex-shrink-0">
          {/* Secondary Small Boxes for other persons (side-by-side on the left, tiered sizing) */}
          <div className="flex flex-row items-end gap-4">
            {items.map((person, idx) => {
              if (idx === selectedIdx) return null;

              const unselectedIndices = items
                .map((_, i) => i)
                .filter((i) => i !== selectedIdx);
              const rank = unselectedIndices.indexOf(idx);
              const isFurthestLeft = rank === 0;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`${
                    isFurthestLeft
                      ? "w-[85px] h-[110px]"
                      : "w-[110px] h-[140px]"
                  } rounded-3xl overflow-hidden shadow-sm bg-zinc-100 border-2 border-transparent hover:border-[#10B981] transition-all duration-300 transform hover:scale-105 cursor-pointer relative group text-left flex-shrink-0`}
                >
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-2">
                      <UserRound
                        className={`${
                          isFurthestLeft ? "w-8 h-8" : "w-10 h-10"
                        } text-zinc-400 group-hover:text-[#10B981] transition-colors duration-300`}
                        strokeWidth={1.5}
                      />
                      <span
                        className={`${
                          isFurthestLeft ? "text-[10px]" : "text-[11px]"
                        } font-semibold text-zinc-700 text-center mt-1 line-clamp-1`}
                      >
                        {person.name.split(" ").slice(-1)[0]}
                      </span>
                      {person.sectionBadge && (
                        <span className="text-[9px] text-zinc-400 font-medium">
                          {person.sectionBadge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Selected Big Box (on the right of small boxes) */}
          <div className="w-[550px] h-[600px] rounded-3xl overflow-hidden shadow-sm bg-zinc-100 flex items-center justify-center">
            {selectedPerson.image ? (
              <img
                src={selectedPerson.image}
                alt={selectedPerson.name}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <AvatarPlaceholder />
            )}
          </div>
        </div>

        {/* Right Side: Selected Person Details */}
        <div
          ref={rightSideRef}
          className="max-w-xl text-left flex flex-col gap-4"
        >
          {selectedPerson.sectionBadge && (
            <div className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
              <span>{selectedPerson.sectionBadge}</span>
            </div>
          )}

          {selectedPerson.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-zinc-600 text-sm md:text-[18px] leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Main About page ───────────────────────────────────────────────────────────
const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>(
    Array(MEMBERS.length).fill(null),
  );
  const isScrollingRef = useRef(false);

  const scrollToSection = (index: number) => {
    if (isScrollingRef.current || index < 0 || index >= MEMBERS.length) return;
    const target = sectionRefs.current[index];
    if (!target) return;
    isScrollingRef.current = true;
    target.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(index);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 900);
  };

  useEffect(() => {
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      if (e.deltaY > 30) scrollToSection(activeIndex + 1);
      else if (e.deltaY < -30) scrollToSection(activeIndex - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (diff > 50) scrollToSection(activeIndex + 1);
      else if (diff < -50) scrollToSection(activeIndex - 1);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", onWheel, { passive: false });
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchend", onTouchEnd, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("wheel", onWheel);
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.6 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative w-full bg-[#FEFEFE]">
      <Navbar />

      <ScrollDots
        total={MEMBERS.length}
        active={activeIndex}
        onDotClick={scrollToSection}
      />

      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-scroll snap-y snap-mandatory"
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties
        }
      >
        {MEMBERS.map((member, i) => {
          if (i === 2) {
            return (
              <SliderSection
                key={i}
                badgeTitle="Our executives"
                items={EXECUTIVES}
                isActive={activeIndex === i}
                setSectionRef={(el) => {
                  sectionRefs.current[i] = el;
                }}
              />
            );
          }
          if (i === 3) {
            return (
              <SliderSection
                key={i}
                badgeTitle="Our managers"
                items={MANAGERS}
                isActive={activeIndex === i}
                setSectionRef={(el) => {
                  sectionRefs.current[i] = el;
                }}
              />
            );
          }
          if (i === 4) {
            return (
              <SliderSection
                key={i}
                badgeTitle="Our assistant managers"
                items={ASSISTANT_MANAGERS}
                isActive={activeIndex === i}
                setSectionRef={(el) => {
                  sectionRefs.current[i] = el;
                }}
              />
            );
          }
          if (i === 5) {
            return (
              <SliderSection
                key={i}
                badgeTitle="Our support staffs"
                items={SUPPORT_STAFFS}
                isActive={activeIndex === i}
                setSectionRef={(el) => {
                  sectionRefs.current[i] = el;
                }}
              />
            );
          }
          return (
            <MemberSection
              key={i}
              member={member}
              index={i}
              isActive={activeIndex === i}
              setSectionRef={(el) => {
                sectionRefs.current[i] = el;
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default About;
