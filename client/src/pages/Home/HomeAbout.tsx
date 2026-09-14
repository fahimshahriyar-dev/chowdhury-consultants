import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import founderImg from "../../assets/images/Md_Wahab_Hossain_Chowdhury.png";

interface AboutProps {
  active?: boolean;
}

const HomeAbout = ({ active = false }: AboutProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll("h1 .word") ?? [];

      // Step 1: Words start from bottom (y: 60) and 0 opacity, scaled up ~1.3x (15px bigger)
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
      gsap.set(subtitleRef.current, { y: 60, opacity: 0 });

      // Left side text items for staggered reveal from bottom to top
      const leftItems = paragraphsRef.current
        ? Array.from(paragraphsRef.current.children)
        : [];
      gsap.set(leftItems, { y: 50, opacity: 0 });

      // Image box comes from further down (y: 200)
      gsap.set(boxRef.current, { y: 200, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.4 });

      if (!active) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Header bullet point (green badge) opacity 0 -> 1
      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 })

      // Both word reveal (y: 60 -> 0, opacity: 0 -> 1) and scale (scale: 1.3 -> 1) happen simultaneously WORD-BY-WORD
      .to(titleWords, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
      }, "-=0.4")
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.1 }, "-=0.8")

        // Left side items stagger bottom to top (y: 50 -> 0, opacity 0 -> 1)
        .to(leftItems, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
        }, "-=0.8")

        // Right side image box starts at the EXACT SAME TIME as the left side text items ("<")
        .to(boxRef.current, { y: 0, opacity: 1, duration: 1.4 }, "<")
        .to(
          imageRef.current,
          { scale: 1, duration: 1.4, ease: "power2.out" },
          "<",
        );
    }, section1Ref);

    return () => ctx.revert();
  }, [active]);

  return (
    <div
      ref={sectionRef}
      id="about-scroll"
      className="relative w-full h-screen overflow-hidden bg-[#FEFEFE] snap-y snap-mandatory shadow-none border-none"
    >
      {/* Section 1 */}
      <section
        ref={section1Ref}
        className="relative container w-full h-full min-h-full snap-start"
      >
        {/* Top Founder Header - Centered */}
        <div className="pt-20 pb-12 text-center flex flex-col items-center">
          <div ref={titleRef} className="flex flex-col items-center">
            <div ref={headerBadgeRef} className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              <span>Our founder</span>
            </div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl tracking-tight text-black leading-tight max-w-5xl flex flex-wrap items-center justify-center gap-x-4">
              {"Md. Wahab Hossain Chowdhury".split(" ").map((word, i) => (
                <span key={i} className="inline-block pb-1">
                  <span className="word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          <p
            ref={subtitleRef}
            className="mt-3 text-zinc-500 text-sm md:text-xl tracking-normal font-normal"
          >
            Founder &amp; Managing Partner
          </p>
        </div>

        {/* Content Section: Text on Left, Image on Right */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6 px-50">
          {/* Left Side Texts */}
          <div ref={paragraphsRef} className="max-w-xl text-left flex flex-col gap-4">
            {/* Item 1: Green bullet point & badge text */}
            <div className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              <span>Our Firm at a Glance</span>
            </div>

            {/* Item 2: Title and established text */}
            <div className="flex gap-1 items-end text-zinc-600 text-sm md:text-[18px]">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                Chowdhury Consultants
              </h2>
              <span className="">established in 2001</span>
            </div>

            {/* Item 3: Next paragraph */}
            <p className="text-zinc-600 text-sm md:text-[18px] leading-relaxed">
              We provide a wide range of professional services to clients in
              the public, private, and sole proprietorship sectors.
            </p>

            {/* Item 4: Then next paragraph */}
            <p className="text-zinc-600 text-sm md:text-[18px] leading-relaxed">
              We are committed to providing quality, reliable, and
              professional services tailored to the needs of our clients.
              Our aim is to build long-term relationships and help our
              clients achieve their goals through effective and practical
              solutions.
            </p>
          </div>

          {/* Right Side Image */}
          <div
            ref={boxRef}
            className="w-[550px] h-[600px] rounded-3xl overflow-hidden shadow-sm"
          >
            <div className="bg-zinc-100 w-full h-full flex items-center justify-center overflow-hidden rounded-3xl">
              <img
                ref={imageRef}
                src={founderImg}
                alt="Md. Wahab Hossain Chowdhury"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeAbout;
