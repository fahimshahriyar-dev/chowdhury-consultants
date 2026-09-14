import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Building2,
  Building,
  UserCheck,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface HomeServiceProps {
  active?: boolean;
  onGoToPreviousPage?: () => void;
  onGoToNextPage?: () => void;
}

interface ServiceSection {
  id: number;
  optionLabel: string;
  badgeTitle: string;
  icon: React.ReactNode;
  services: string[];
  executives?: string[];
}

const servicesData: ServiceSection[] = [
  {
    id: 1,
    optionLabel: "Local/Multinationals/Joint venture Company related issues",
    badgeTitle: "Local / Multinationals / Joint Venture Company Services",
    icon: <Building2 className="w-6 h-6 text-[#10B981]" />,
    services: [
      "Secretarial Works (RJSC)",
      "Trade License",
      "Chamber of Commerce Membership",
      "IRC & ERC registration & renewal",
      "VAT registration (Local & Import)",
      "Trade Mark, Patents registration",
      "BOI registration/Enlistment",
      "Corporate Tax Service",
      "Corporate VAT service",
      "Tax exemption from NBR",
      "Company’s Accounting service",
      "Company’s Quarterly accounts service",
      "Tax Holyday permission from NBR",
      "Bonded warehouse License",
      "Labor Court permission approval/renewal",
      "BSTI Registration",
      "Legal Service of Court",
      "Provident Fund approval from NBR",
      "Gratuity Fund approval from NBR",
      "Pension Fund approval from NBR",
      "Workers PP Fund approval from NBR",
    ],
  },
  {
    id: 2,
    optionLabel: "Liaison/Branch Office (local/ Foreign) related issues",
    badgeTitle: "Liaison / Branch Office (Local & Foreign) Services",
    icon: <Building className="w-6 h-6 text-[#10B981]" />,
    services: [
      "Liaison/Branch Office BOI Permission",
      "18B permission from Bangladesh Bank",
      "Annual Permission renewal",
      "Quarterly accounts service",
      "Corporate Tax Service",
      "Corporate VAT service",
      "Company’s other legal matters",
    ],
    executives: [
      "Mr. Wahab Hossain Chowdhury",
      "Advocate Md. Shahidul Islam Chowdhury",
      "Md. Moniruzzaman, FCA.",
      "Md. Humayun Kabir FCA.",
      "Nur-E-Alam Siddique ACA.",
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
    id: 3,
    optionLabel: "Individual- (Local & foreign national) related issues",
    badgeTitle: "Individual (Local & Foreign National) Services",
    icon: <UserCheck className="w-6 h-6 text-[#10B981]" />,
    services: [
      "“E” Visa recommendation",
      "Work permit",
      "Multiple Visa permission/Renewal",
      "Security clearance of foreign nation",
      "Salary Tax computation",
      "Employee’s Tax assessment",
      "Other legal matters",
    ],
  },
  {
    id: 4,
    optionLabel: "Sole proprietorship/partnership related issues",
    badgeTitle: "Sole Proprietorship / Partnership Services",
    icon: <Briefcase className="w-6 h-6 text-[#10B981]" />,
    services: [
      "Partnership deed",
      "Partnership registration",
      "Trade License",
      "Chamber of Commerce Membership",
      "IRC & ERC registration",
      "VAT registration (Local & Import)",
      "Trade Mark, Patents registration",
      "BOI registration/Enlistment",
      "Tax & VAT Service",
      "Tax exemption from NBR",
      "Other legal matters",
    ],
  },
];

const HomeService = ({ active = false, onGoToPreviousPage, onGoToNextPage }: HomeServiceProps) => {
  const section1Ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const stepperContainerRef = useRef<HTMLDivElement>(null);
  const stepperItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedSectionId, setSelectedSectionId] = useState<number>(1);
  const selectedSectionIdRef = useRef<number>(1);
  useEffect(() => {
    selectedSectionIdRef.current = selectedSectionId;
  }, [selectedSectionId]);

  const isAnimatingRef = useRef<boolean>(false);
  // Safety-net timer: force-releases the animation lock if a timeline
  // somehow never fires onComplete/onInterrupt, so the UI can never get stuck.
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearUnlockTimeout = () => {
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }
  };

  const releaseAnimationLock = () => {
    isAnimatingRef.current = false;
    clearUnlockTimeout();
  };

  // Stepper ball animated position
  const [ballTop, setBallTop] = useState<number>(16);
  const containerStepperRef = useRef<HTMLDivElement>(null);

  // Custom Cursor State when hovering service box
  const [isHoveringBox, setIsHoveringBox] = useState<boolean>(false);
  const [cursorDir, setCursorDir] = useState<"up" | "down">("down");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Switch section with full box sliding (background + content together)
  const handleSectionSelect = (newId: number) => {
    const currentId = selectedSectionIdRef.current;
    if (newId === currentId || isAnimatingRef.current) return;

    const currentIdx = servicesData.findIndex((s) => s.id === currentId);
    const newIdx = servicesData.findIndex((s) => s.id === newId);
    const isNext = newId > currentId;

    // 1. Instantly trigger ball animation and active text state update
    const targetBtn = stepperItemsRef.current[newIdx];
    if (targetBtn && containerStepperRef.current) {
      setBallTop(targetBtn.offsetTop + targetBtn.offsetHeight / 2);
    }
    setSelectedSectionId(newId);

    isAnimatingRef.current = true;

    const currentBox = boxRefs.current[currentIdx];
    const newBox = boxRefs.current[newIdx];

    if (!currentBox || !newBox) {
      releaseAnimationLock();
      return;
    }

    // Kill any leftover tweens on these boxes/children from a previous,
    // possibly-interrupted transition so nothing conflicts or gets stuck
    // mid-animation.
    gsap.killTweensOf([
      currentBox,
      newBox,
      ...currentBox.querySelectorAll(".box-word, [data-services-heading], .service-card"),
      ...newBox.querySelectorAll(".box-word, [data-services-heading], .service-card"),
    ]);

    // Directional offsets for FULL BOX:
    // Going NEXT (1 -> 2): Current box slides UP and fades out. New box comes from BOTTOM and slides UP.
    // Going PREV (2 -> 1): Current box slides DOWN and fades out. New box comes from TOP and slides DOWN.
    const exitY = isNext ? -120 : 120;
    const enterY = isNext ? 120 : -120;

    // Reset incoming box state before sliding in
    newBox.scrollTop = 0;
    gsap.set(newBox, { y: enterY, opacity: 0, zIndex: 10, display: "block" });
    gsap.set(currentBox, { zIndex: 5 });

    const newTitleWords = newBox.querySelectorAll(".box-word");
    const newOfferedHeading = newBox.querySelector("[data-services-heading]");
    const newServiceCards = newBox.querySelectorAll(".service-card");
    const newRows = Math.ceil((servicesData[newIdx]?.services.length ?? 1) / 2);

    if (newTitleWords.length > 0) gsap.set(newTitleWords, { y: 20, opacity: 0 });
    if (newOfferedHeading) gsap.set(newOfferedHeading, { y: 30, opacity: 0 });
    if (newServiceCards.length > 0) gsap.set(newServiceCards, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentBox, { display: "none" });
        releaseAnimationLock();
      },
      // If the timeline is killed/overwritten before it finishes, still
      // release the lock so the UI never becomes unresponsive.
      onInterrupt: () => {
        gsap.set(currentBox, { display: "none" });
        releaseAnimationLock();
      },
    });

    // 1. Current full box slides out & fades out (slower)
    tl.to(currentBox, {
      y: exitY,
      opacity: 0,
      duration: 0.65,
      ease: "power2.inOut",
      overwrite: "auto",
    }, 0)
    // 2. New full box slides in & fades in (slower)
    .to(newBox, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      overwrite: "auto",
    }, 0.1)
    // 3. Reveal inner title words word-by-word (slower)
    .to(
      newTitleWords,
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.09,
        ease: "power3.out",
      },
      "-=0.35"
    )
    // 4. "Services Offered" heading rises first (slower)
    .to(
      newOfferedHeading,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.15"
    )
    // 5. Service cards rise row by row (slower)
    .to(
      newServiceCards,
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: { each: 0.12, grid: [newRows, 2], axis: "y", from: "start" },
      },
      "-=0.15"
    );

    // Belt-and-suspenders: if for any reason the timeline's own callbacks
    // never fire, force-unlock shortly after it should have finished.
    clearUnlockTimeout();
    unlockTimeoutRef.current = setTimeout(() => {
      if (isAnimatingRef.current) {
        gsap.set(currentBox, { display: "none" });
        releaseAnimationLock();
      }
    }, tl.duration() * 1000 + 400);
  };

  // Release any pending safety timer on unmount
  useEffect(() => {
    return () => clearUnlockTimeout();
  }, []);

  // Update ball Y offset dynamically on selection change to align with center of active button
  useEffect(() => {
    const updateBallPosition = () => {
      const selectedIdx = servicesData.findIndex((s) => s.id === selectedSectionId);
      const targetBtn = stepperItemsRef.current[selectedIdx];
      if (targetBtn && containerStepperRef.current) {
        const btnOffsetTop = targetBtn.offsetTop;
        const btnHeight = targetBtn.offsetHeight;
        // Position ball right at exact vertical center of the section option text button
        setBallTop(btnOffsetTop + btnHeight / 2);
      }
    };

    updateBallPosition();
    window.addEventListener("resize", updateBallPosition);
    return () => window.removeEventListener("resize", updateBallPosition);
  }, [selectedSectionId]);

  // Wheel navigation on the service box: scroll between options at boundaries,
  // and hand off to the previous/next page at the very first/last option.
  useEffect(() => {
    const rightContainer = document.querySelector('[data-service-box-container]') as HTMLElement | null;
    if (!rightContainer) return;

    const handleBoxWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;

      const currentId = selectedSectionIdRef.current;
      const currentIdx = servicesData.findIndex((s) => s.id === currentId);
      const activeBox = boxRefs.current[currentIdx];
      if (!activeBox) return;

      const isFirst = currentIdx === 0;
      const isLast = currentIdx === servicesData.length - 1;
      const atTop = activeBox.scrollTop <= 1;
      const atBottom = activeBox.scrollHeight - activeBox.scrollTop - activeBox.clientHeight <= 1;

      const scrollingDown = e.deltaY > 15;
      const scrollingUp = e.deltaY < -15;

      if (scrollingDown && atBottom) {
        e.preventDefault();
        if (isLast) {
          // Last option, scrolled to its bottom → go to the next page
          onGoToNextPage?.();
        } else {
          // Go to next option
          handleSectionSelect(servicesData[currentIdx + 1].id);
        }
      } else if (scrollingUp && atTop) {
        e.preventDefault();
        if (isFirst) {
          // First option at top → go to previous page
          onGoToPreviousPage?.();
        } else {
          // Go to previous option
          handleSectionSelect(servicesData[currentIdx - 1].id);
        }
      }
    };

    rightContainer.addEventListener('wheel', handleBoxWheel, { passive: false });
    return () => rightContainer.removeEventListener('wheel', handleBoxWheel);
  }, [onGoToPreviousPage, onGoToNextPage]);

  // Mouse move handler for custom cursor direction on the box container
  const handleBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const halfHeight = rect.height / 2;
    setCursorDir(relativeY < halfHeight ? 'up' : 'down');
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll("h1 .word") ?? [];
      const stepperButtons = stepperItemsRef.current.filter(Boolean);
      const activeBox = boxRefs.current[0];

      // Always hide pre-animation designs until section becomes active
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });

      // Stepper options: start hidden and offset below, ready to animate up one by one
      if (stepperButtons.length > 0) {
        gsap.set(stepperButtons, { opacity: 0, y: 30 });
      }

      // Initial box states: hidden initially
      boxRefs.current.forEach((box, idx) => {
        if (box) {
          if (idx === 0) {
            gsap.set(box, { y: 120, opacity: 0, display: "block", zIndex: 10 });
            const boxTitleWords = box.querySelectorAll(".box-word");
            const offeredHeading = box.querySelector("[data-services-heading]");
            const serviceCards = box.querySelectorAll(".service-card");
            if (boxTitleWords.length > 0) gsap.set(boxTitleWords, { y: 20, opacity: 0 });
            if (offeredHeading) gsap.set(offeredHeading, { y: 30, opacity: 0 });
            if (serviceCards.length > 0) gsap.set(serviceCards, { y: 30, opacity: 0 });
          } else {
            gsap.set(box, { opacity: 0, display: "none", zIndex: 1 });
          }
        }
      });

      if (!active) return;

      const activeBoxTitleWords = activeBox?.querySelectorAll(".box-word") ?? [];
      const activeOfferedHeading = activeBox?.querySelector("[data-services-heading]") ?? null;
      const activeServiceCards = activeBox?.querySelectorAll(".service-card") ?? [];
      const activeRows = Math.ceil((servicesData[0]?.services.length ?? 1) / 2);

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
        // 2.5 Stepper items slide up into place one by one, smoothly
        .to(
          stepperButtons,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.6"
        )
        // 3. Initial service box comes from bottom to top (slightly slower)
        .to(
          activeBox,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        )
        // 4. Reveal box title words (slower)
        .to(
          activeBoxTitleWords,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.09,
          },
          "-=0.6"
        )
        // 5. "Services Offered" heading rises first (slower)
        .to(
          activeOfferedHeading,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25"
        )
        // 6. Service cards rise row by row (slower)
        .to(
          activeServiceCards,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: { each: 0.12, grid: [activeRows, 2], axis: "y", from: "start" },
          },
          "-=0.2"
        );
    }, section1Ref);

    return () => ctx.revert();
  }, [active]);

  return (
    <div
      id="service-scroll"
      className="relative w-full h-screen overflow-hidden bg-[#FEFEFE] pt-20 pb-8 px-4 md:px-12 lg:px-24 flex flex-col"
    >
      <section ref={section1Ref} className="container mx-auto max-w-7xl flex flex-col h-full">
        {/* Header - Matching About & Work design */}
        <div className="pb-12 text-center flex flex-col items-center">
          <div ref={titleRef} className="flex flex-col items-center">
            {/* Green Bullet Point + Text */}
            <div
              ref={headerBadgeRef}
              className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              <span>Service Overview</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4">
              {"Services We Provide".split(" ").map((word, i) => (
                <span key={i} className="inline-block pb-1">
                  <span className="word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Content layout: Stepper Left, Data Boxes Right */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 flex-1 min-h-0">
          {/* Left Stepper / Vertical Animated Navigation */}
          <div ref={stepperContainerRef} className="w-full lg:w-[38%] flex flex-col pl-2 py-2 h-full overflow-y-auto">
            <div ref={containerStepperRef} className="relative flex flex-col pl-6 h-full">
              {/* Line ABOVE the sliding ball with padding gap */}
              <div
                className="absolute left-[3.5px] top-0 w-[1.5px] bg-zinc-300 transition-all duration-500 ease-out"
                style={{
                  height: Math.max(0, ballTop - 18),
                }}
              />

              {/* Line BELOW the sliding ball with padding gap */}
              <div
                className="absolute left-[3.5px] bottom-0 w-[1.5px] bg-zinc-300 transition-all duration-500 ease-out"
                style={{
                  top: ballTop + 22,
                }}
              />

              {/* Sliding Active Ball */}
              <div
                className="absolute left-0 w-2.5 h-2.5 rounded-full bg-black transition-all duration-500 ease-out z-10"
                style={{
                  top: `${ballTop}px`,
                  transform: "translateY(-50%)",
                }}
              />

              {servicesData.map((item, index) => {
                const isSelected = item.id === selectedSectionId;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      stepperItemsRef.current[index] = el;
                    }}
                    onClick={() => handleSectionSelect(item.id)}
                    className="relative flex items-start gap-4 py-3.5 pl-0 pr-2 text-left group cursor-pointer will-change-transform"
                  >
                    {/* Label Text */}
                    <span
                      className={`text-sm md:text-base lg:text-[15px] xl:text-base font-normal whitespace-nowrap transition-colors duration-300 leading-snug ${
                        isSelected
                          ? "text-black"
                          : "text-zinc-400 hover:text-zinc-700"
                      }`}
                    >
                      {item.optionLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Data Display Container holding individual service boxes */}
          <div
            data-service-box-container
            className="relative w-full lg:w-[62%] h-full"
            style={{ cursor: isHoveringBox ? 'none' : 'default' }}
            onMouseEnter={() => setIsHoveringBox(true)}
            onMouseLeave={() => setIsHoveringBox(false)}
            onMouseMove={handleBoxMouseMove}
          >
            {servicesData.map((section, idx) => (
              <div
                key={section.id}
                ref={(el) => {
                  boxRefs.current[idx] = el;
                }}
                data-service-box
                className="absolute inset-0 bg-[#F6F7F7] rounded-3xl p-6 md:p-8 overflow-y-auto h-full shadow-none"
                style={{ cursor: isHoveringBox ? 'none' : 'default' }}
              >
                {/* Header section with Icon & Title */}
                <div className="flex items-center gap-3.5 pb-4">
                  <div className="flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight flex flex-wrap gap-x-2">
                    {section.badgeTitle.split(" ").map((word, i) => (
                      <span key={i} className="inline-block">
                        <span className="box-word inline-block will-change-transform">
                          {word}
                        </span>
                      </span>
                    ))}
                  </h2>
                </div>

                {/* Services List */}
                <div className="pt-4">
                  <h3
                    data-services-heading
                    className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 inline-block will-change-transform"
                  >
                    Services Offered ({section.services.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.services.map((service, index) => (
                      <div
                        key={index}
                        className="service-card flex items-start gap-3 bg-white rounded-xl p-3.5 transition-colors will-change-transform"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-zinc-800 leading-snug">
                          <span className="text-zinc-400 mr-1.5 font-normal">
                            {index + 1}.
                          </span>
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Custom cursor overlay — small, simple arrow that flips with scroll direction */}
            {isHoveringBox && (
              <div
                className="pointer-events-none fixed z-[9999]"
                style={{
                  left: cursorPos.x,
                  top: cursorPos.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transition: 'transform 0.15s ease',
                    transform: cursorDir === 'up' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path
                    d="M8 3V13M8 13L3.5 8.5M8 13L12.5 8.5"
                    stroke="black"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeService;