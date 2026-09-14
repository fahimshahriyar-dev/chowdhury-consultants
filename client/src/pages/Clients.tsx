import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";

interface ClientCategory {
  title: string;
  companies: string[];
}

const categoriesData: ClientCategory[] = [
  {
    title: "Multinational Companies",
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
  },
  {
    title: "Group Companies",
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
  },
  {
    title: "100% Foreign Shareholder Company",
    companies: [
      "The Delegation of European Union",
      "Fullcharm Fashions Knitwear Ltd.",
      "Vanessa Enterprise Ltd.",
      "Scomi Oiltools Limited",
      "Caigle Bangladesh Trading Ltd.",
      "Fucheng Enterprise Ltd.",
      "Xing Sheng (HK) Bangladesh Ltd.",
    ],
  },
  {
    title: "100% Foreign Liaison Office",
    companies: [
      "Triton Textile Limited",
      "VF Asia Limited",
      "Vinarco Services (Thailand) Ltd.",
      "ECOM Agro industrial Asia Pte. Ltd.",
      "Sun fortune Private Ltd.",
      "Consulting Services International Ltd.",
      "Li & Fung (Bangladesh) Ltd.",
    ],
  },
  {
    title: "Pharmaceuticals Companies",
    companies: [
      "Rephco Pharmaceuticals Ltd.",
      "Sanofi Aventis Limited",
      "Bangladesh Hospital Services Ltd.",
      "Inbiz Chemotic Limited",
      "Rockea Chemical Ind. Limited",
    ],
  },
  {
    title: "100% Export Oriented Garments Companies",
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
  },
  {
    title: "Developers Companies",
    companies: [
      "Jaas Proprieties Limited",
      "Mystical Properties Limited",
      "Nur & Naher Properties Limited",
      "SAS Building Makers Ltd.",
      "SAS Structural Limited",
    ],
  },
  {
    title: "100% Foreign Based Companies",
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
  },
  {
    title: "Others Companies",
    companies: [
      "Cross World Limited",
      "Cross World Power Limited",
      "SBS Express International Ltd.",
      "IHT Bangladesh Limited",
      "Shaheen Cable Wire Drawings Ltd.",
      "Farzana Shakil Makeovers Salon Limited",
      "Comilla Consortium Limited",
    ],
  },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Clients: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Group company names by their first letter, maintaining category title
  const alphabeticalGroups = useMemo(() => {
    const groups: { [key: string]: { categoryTitle: string; name: string }[] } =
      {};

    categoriesData.forEach((cat) => {
      cat.companies.forEach((company) => {
        const firstLetter = company.charAt(0).toUpperCase();
        if (/[A-Z]/.test(firstLetter)) {
          if (!groups[firstLetter]) {
            groups[firstLetter] = [];
          }
          groups[firstLetter].push({
            categoryTitle: cat.title,
            name: company,
          });
        }
      });
    });

    return groups;
  }, []);

  const sortedLetters = useMemo(() => {
    return Object.keys(alphabeticalGroups).sort();
  }, [alphabeticalGroups]);

  const displayedLetters = useMemo(() => {
    if (selectedLetter) {
      return sortedLetters.filter((l) => l === selectedLetter);
    }
    return sortedLetters;
  }, [sortedLetters, selectedLetter]);

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-black flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 md:px-12 py-20 max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#10B981] font-medium text-sm md:text-base mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span>Client Index</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
            Our Valued Clients
          </h1>
          <p className="text-zinc-500 text-sm md:text-base">
            Explore our extensive directory of multinational corporations, group
            companies, foreign entities, and local partners.
          </p>
        </div>

        {/* Alphabet Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-14 py-3 px-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 shadow-sm">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              selectedLetter === null
                ? "bg-black text-white shadow-sm"
                : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => {
            const hasItems = !!alphabeticalGroups[letter];
            const isSelected = selectedLetter === letter;

            return (
              <button
                key={letter}
                disabled={!hasItems}
                onClick={() => setSelectedLetter(isSelected ? null : letter)}
                className={`w-7 h-7 md:w-8 md:h-8 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-black text-white shadow-sm"
                    : hasItems
                      ? "text-zinc-800 hover:bg-zinc-200/70 hover:text-black"
                      : "text-zinc-300 cursor-not-allowed opacity-40"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Alphabetical Rows */}
        <div className="space-y-12">
          {displayedLetters.map((letter) => {
            const items = alphabeticalGroups[letter] || [];
            return (
              <div
                key={letter}
                className="flex flex-col md:flex-row items-start gap-6 md:gap-10 pb-10 border-b border-zinc-200/80 last:border-b-0"
              >
                {/* Large Alphabet Indicator */}
                <div className="w-16 md:w-24 text-5xl md:text-6xl font-extrabold text-black tracking-tighter flex-shrink-0 leading-none select-none">
                  {letter}
                </div>

                {/* Grid of Clients (Title on top, Company name below) */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-1 group">
                      <span className="text-[11px] md:text-xs font-semibold text-[#10B981] uppercase tracking-wider line-clamp-1">
                        {item.categoryTitle}
                      </span>
                      <h3 className="text-base md:text-[17px] font-bold text-zinc-900 leading-snug group-hover:text-black transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Clients;
