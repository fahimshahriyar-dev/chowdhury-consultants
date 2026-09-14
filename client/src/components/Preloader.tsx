import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onSlideUp?: () => void;
  onComplete?: () => void;
}

const Preloader = ({ onSlideUp, onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  // Store latest callbacks in refs so re-renders in parent never re-trigger the animation
  const onSlideUpRef = useRef(onSlideUp);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onSlideUpRef.current = onSlideUp;
    onCompleteRef.current = onComplete;
  }, [onSlideUp, onComplete]);

  useEffect(() => {
    // Lock background scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const textWrapper = textWrapperRef.current;

    if (!overlay || !textWrapper) return;

    const ctx = gsap.context(() => {
      // Set initial GSAP states
      gsap.set(overlay, { yPercent: 0, autoAlpha: 1 });
      gsap.set(textWrapper, {
        clipPath: "inset(0% 100% 0% 0%)",
        WebkitClipPath: "inset(0% 100% 0% 0%)",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setIsRemoved(true);
          onCompleteRef.current?.();
        },
      });

      // 1. Brief pause to ensure clean rendering on load
      tl.to({}, { duration: 0.2 });

      // 2. Horizontal reveal: text reveals horizontally from left to right (runs ONCE)
      tl.to(textWrapper, {
        clipPath: "inset(0% 0% 0% 0%)",
        WebkitClipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power2.inOut",
      });

      // 3. Elegant hold to admire the complete brand name
      tl.to({}, { duration: 0.4 });

      // 4. White page layer automatically slides up to reveal hero section
      tl.to(overlay, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        onStart: () => {
          onSlideUpRef.current?.();
        },
      });
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
    };
  }, []); // Run ONCE on mount — prevents repeating on state changes

  if (isRemoved) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-[#FEFEFE] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div className="relative inline-flex items-center justify-center max-w-[95vw]">
        {/* Horizontal Reveal Text Container */}
        <div
          ref={textWrapperRef}
          className="relative inline-block overflow-hidden py-3 px-2"
          style={{
            clipPath: "inset(0% 100% 0% 0%)",
            WebkitClipPath: "inset(0% 100% 0% 0%)",
          }}
        >
          {/* Pure Logo Name */}
          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider sm:tracking-widest text-black uppercase font-sans whitespace-nowrap leading-none m-0 text-center">
            CHOWDHURY CONSULTANTS
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
