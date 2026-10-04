import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface WorkItem {
  id: number;
  company: string;
  service: string;
  images: string[];
}

interface WorkModalProps {
  work: WorkItem | null;
  initialIndex?: number;
  onClose: () => void;
}

const WorkModal = ({ work, initialIndex = 0, onClose }: WorkModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(initialIndex);

  useEffect(() => {
    if (!work) return;
    setActiveImageIndex(initialIndex);
  }, [work, initialIndex]);

  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setActiveImageIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight")
        setActiveImageIndex((i) => Math.min(work.images.length - 1, i + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, work]);

  if (!work) return null;

  const goPrev = () => setActiveImageIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setActiveImageIndex((i) => Math.min(work.images.length - 1, i + 1));

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-black">{work.company}</h3>
            <p className="text-zinc-500 text-sm">{work.service}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 flex items-center justify-center text-xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Featured Image with Arrow Navigation */}
          <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden bg-zinc-950 group">
            <img
              src={work.images[activeImageIndex]}
              alt="Selected Work"
              className="w-full h-full object-contain"
            />

            {/* Left Arrow */}
            <button
              onClick={goPrev}
              disabled={activeImageIndex === 0}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goNext}
              disabled={activeImageIndex === work.images.length - 1}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {work.images.length}
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
              All Images ({work.images.length})
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {work.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#10B981] scale-95"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default WorkModal;