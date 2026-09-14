import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PhoneInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CtaProps {
  active?: boolean;
}

const Cta = ({ active = false }: CtaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [contactType, setContactType] = useState<"phone" | "email">("email");
  const [phone, setPhone] = useState<Value | undefined>();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll(".word") ?? [];

      // Initial GSAP setup like HomeAbout
      gsap.set(headerBadgeRef.current, { opacity: 0 });
      gsap.set(titleWords, {
        y: 60,
        opacity: 0,
        scale: 1.3,
        transformOrigin: "center center",
      });
      gsap.set(subtitleRef.current, { y: 60, opacity: 0 });
      gsap.set(formCardRef.current, { y: 100, opacity: 0 });

      if (!active) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Green badge opacity 0 -> 1
      tl.to(headerBadgeRef.current, { opacity: 1, duration: 0.8 })
        // 2. Word reveal (y: 60 -> 0, opacity: 0 -> 1, scale: 1.3 -> 1) word-by-word
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
        // 3. Subtitle animation
        .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.1 }, "-=0.8")
        // 4. Form card slides up softly
        .to(formCardRef.current, { y: 0, opacity: 1, duration: 1.2 }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FEFEFE] flex flex-col justify-center items-center px-4 pt-20 md:pt-24 pb-8 md:pb-12"
    >
      {/* Header Container */}
      <div className="text-center flex flex-col items-center max-w-3xl mb-8 mt-1">
        {/* Bullet Badge */}
        <div
          ref={headerBadgeRef}
          className="flex items-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
          <span>Expert Consultancy</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-black leading-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          {"Your Trusted Partner for Professional Solutions"
            .split(" ")
            .map((word, i) => (
              <span key={i} className="inline-block pb-1">
                <span className="word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-3 text-zinc-500 text-sm md:text-base max-w-xl font-normal leading-relaxed"
        >
          Providing reliable legal, tax and consultancy services tailored to
          your needs
        </p>
      </div>

      {/* Form Card */}
      <div
        ref={formCardRef}
        className="w-full max-w-3xl bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          {/* 1. Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-800 tracking-wide">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* 2. Contact Method (Email / Number Toggle) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-800 tracking-wide">
                {contactType === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setContactType("email")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    contactType === "email"
                      ? "bg-white text-black shadow-sm"
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContactType("phone")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    contactType === "phone"
                      ? "bg-white text-black shadow-sm"
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  Number
                </button>
              </div>
            </div>

            {contactType === "phone" ? (
              <PhoneInput
                international
                defaultCountry="BD"
                value={phone}
                onChange={setPhone}
                placeholder="Enter your phone number"
                className="phone-input w-full px-4 py-3 rounded-xl border border-zinc-200 focus-within:border-zinc-400 transition-colors"
              />
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            )}
          </div>

          {/* 3. What service you want to take? (Textarea) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-800 tracking-wide">
              What service you want to take?
            </label>
            <textarea
              rows={2}
              placeholder="Enter the service you need"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* 4. Address (Textarea with non-resizable style) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-800 tracking-wide">
              Address
            </label>
            <textarea
              rows={2}
              placeholder="Enter your address"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-black text-white font-medium text-sm rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cta;
